import { Component, OnInit } from '@angular/core'; // 1. Importe OnInit
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // 2. Importe CommonModule

// 3. Importe o serviço e as interfaces
import { PremiumService, Premium } from './services/premium.service'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  
  // 4. Adicione CommonModule aqui (para usar *ngFor)
  imports: [RouterOutlet, CommonModule,FormsModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit { // 5. Implemente OnInit
  
  // 6. Crie uma variável para guardar a lista de premiums
  public premiums: Premium[] = [];
  public novoPremium: any = {
    title: '',
    clientId: 1 
  };

  public premiumParaEditar: Premium | null = null;

  // 7. Injete o seu serviço
  constructor(private premiumService: PremiumService) {}

  // 8. O ngOnInit é chamado quando o componente carrega
  ngOnInit(): void {
    this.carregarPremiums();
  }

  // 9. Crie o método que chama o serviço
  public carregarPremiums(): void {
    this.premiumService.getPremiums().subscribe(
      (data: Premium[]) => {
        
        this.premiums = data;
        console.log('Dados carregados!', this.premiums);
      },
      (erro) => {
        // Deu erro!
        console.error('Erro ao buscar premiums:', erro);
      }
    );
  }

  public onSubmit(): void {
    console.log('Enviando premium:', this.novoPremium);
    
    this.premiumService.addPremium(this.novoPremium).subscribe(
      (premiumCriado: Premium) => {
        
        console.log('Premium criado:', premiumCriado);
        
        
        this.premiums.push(premiumCriado);

        
        this.novoPremium.title = '';
      },
      (erro) => {
        console.error('Erro ao criar premium:', erro);
      }
    );
  }

  public onDelete(id: number): void {
    if (confirm('Tem certeza que deseja deletar este item?')) {
      this.premiumService.deletePremium(id).subscribe(
        () => {
          
          console.log('Premium deletado com sucesso!');
          
          
          this.premiums = this.premiums.filter(p => p.id !== id);
        },
        (erro) => {
          console.error('Erro ao deletar premium:', erro);
        }
      );
    }
  }

  public onEdit(premium: Premium): void {
    
    this.premiumParaEditar = { ...premium }; 
  }

  
  public onCancelEdit(): void {
    this.premiumParaEditar = null; 
  }

  
  public onUpdate(): void {
    if (this.premiumParaEditar) {
      this.premiumService.updatePremium(this.premiumParaEditar.id, this.premiumParaEditar).subscribe(
        () => {
          
          console.log('Premium atualizado!');

          
          const index = this.premiums.findIndex(p => p.id === this.premiumParaEditar!.id);
          if (index !== -1) {
            this.premiums[index] = this.premiumParaEditar!;
          }
          
          
          this.premiumParaEditar = null;
        },
        (erro) => {
          console.error('Erro ao atualizar premium:', erro);
        }
      );
    }
  }

}