import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PremiumService, Premium } from './services/premium.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public whiskeys: Premium[] = [];
  
  // ATUALIZADO: Agora com os campos do cardápio
  public novoPremium: any = {
    title: '',
    type: '',
    origin: '',
    age: 0,
    price: 0,
    description: ''
  };

  public premiumParaEditar: Premium | null = null;
  
  public mostrarFormulario: boolean = false;
  public modoEdicao: boolean = false;

  constructor(private premiumService: PremiumService) {}

  ngOnInit(): void {
    this.carregarPremiums();
  }

  public abrirFormularioAdicionar(): void {
    this.mostrarFormulario = true;
    this.modoEdicao = false;
    this.premiumParaEditar = null;
  }

  public carregarPremiums(): void {
    this.premiumService.getPremiums().subscribe(
      (data: Premium[]) => {
        this.whiskeys = data;
        console.log('Cardápio carregado!', this.whiskeys);
      },
      (erro) => console.error('Erro ao buscar whiskeys:', erro)
    );
  }

  public onSubmit(): void {
    console.log('Enviando novo whiskey:', this.novoPremium);
    
    this.premiumService.addPremium(this.novoPremium).subscribe(
      (whiskeyCriado: Premium) => {
        console.log('Whiskey adicionado ao cardápio:', whiskeyCriado);
        this.whiskeys.push(whiskeyCriado);
        this.fecharFormulario(); // Já limpa o objeto internamente
        this.carregarPremiums();
      },
      (erro) => {
        console.error('Erro ao adicionar whiskey:', erro);
        alert('Erro ao salvar. Verifique se o Backend está rodando.');
      }
    );
  }

  public deletarWhiskey(whiskey: Premium): void {
    if (confirm(`Remover ${whiskey.title} do cardápio?`)) {
      this.premiumService.deletePremium(whiskey.id).subscribe(
        () => {
          this.whiskeys = this.whiskeys.filter(w => w.id !== whiskey.id);
          console.log('Removido com sucesso');
        },
        (erro) => console.error('Erro ao deletar:', erro)
      );
    }
  }

  public editarWhiskey(whiskey: Premium): void {
    this.premiumParaEditar = { ...whiskey };
    this.modoEdicao = true;
    this.mostrarFormulario = true;
  }

  public onUpdate(): void {
    if (this.premiumParaEditar) {
      this.premiumService.updatePremium(this.premiumParaEditar.id, this.premiumParaEditar).subscribe(
        () => {
          console.log('Dados atualizados!');
          this.fecharFormulario();
          this.carregarPremiums();
        },
        (erro) => console.error('Erro ao atualizar:', erro)
      );
    }
  }

  public fecharFormulario(): void {
    this.mostrarFormulario = false;
    this.modoEdicao = false;
    this.premiumParaEditar = null;
    
    // ATUALIZADO: Limpa o formulário com a estrutura nova
    this.novoPremium = {
      title: '',
      type: '',
      origin: '',
      age: 0,
      price: 0,
      description: ''
    };
  }
}