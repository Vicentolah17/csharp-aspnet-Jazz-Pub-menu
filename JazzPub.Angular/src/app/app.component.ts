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
  
  public novoPremium: any = {
    title: '',
    startDate: '',
    endDate: '',
    clientId: 1
  };

  public premiumParaEditar: Premium | null = null;
  
  // Controle do formulário
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
        console.log('Dados carregados!', this.whiskeys);
      },
      (erro) => {
        console.error('Erro ao buscar premiums:', erro);
      }
    );
  }

  public onSubmit(): void {
    console.log('Enviando premium:', this.novoPremium);
    
    this.premiumService.addPremium(this.novoPremium).subscribe(
      (premiumCriado: Premium) => {
        console.log('Premium criado:', premiumCriado);
        this.whiskeys.push(premiumCriado);
        
        // Limpar formulário e fechar
        this.novoPremium = {
          title: '',
          startDate: '',
          endDate: '',
          clientId: 1
        };
        this.fecharFormulario();
        
        // Recarregar para pegar dados atualizados do servidor
        this.carregarPremiums();
      },
      (erro) => {
        console.error('Erro ao criar premium:', erro);
        alert('Erro ao criar premium. Verifique o console.');
      }
    );
  }

  public deletarWhiskey(whiskey: Premium): void {
    if (confirm(`Tem certeza que deseja deletar ${whiskey.title}?`)) {
      this.premiumService.deletePremium(whiskey.id).subscribe(
        () => {
          console.log('Premium deletado com sucesso!');
          this.whiskeys = this.whiskeys.filter(w => w.id !== whiskey.id);
        },
        (erro) => {
          console.error('Erro ao deletar premium:', erro);
          alert('Erro ao deletar premium. Verifique o console.');
        }
      );
    }
  }

  public editarWhiskey(whiskey: Premium): void {
    this.premiumParaEditar = { ...whiskey };
    this.modoEdicao = true;
    this.mostrarFormulario = true;
    console.log('Editando whiskey:', whiskey);
  }

  public onUpdate(): void {
    if (this.premiumParaEditar) {
      this.premiumService.updatePremium(this.premiumParaEditar.id, this.premiumParaEditar).subscribe(
        () => {
          console.log('Premium atualizado!');
          
          const index = this.whiskeys.findIndex(w => w.id === this.premiumParaEditar!.id);
          if (index !== -1) {
            this.whiskeys[index] = this.premiumParaEditar!;
          }
          
          this.fecharFormulario();
          
          // Recarregar para pegar dados atualizados do servidor
          this.carregarPremiums();
        },
        (erro) => {
          console.error('Erro ao atualizar premium:', erro);
          alert('Erro ao atualizar premium. Verifique o console.');
        }
      );
    }
  }

  public fecharFormulario(): void {
    this.mostrarFormulario = false;
    this.modoEdicao = false;
    this.premiumParaEditar = null;
    
    // Limpar formulário
    this.novoPremium = {
      title: '',
      startDate: '',
      endDate: '',
      clientId: 1
    };
  }
}