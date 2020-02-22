import { Component } from '@angular/core';
import Pizzicato from 'pizzicato';
import { PopoverController } from '@ionic/angular';
import { PotatoNotificationComponent } from '../potato-notification/potato-notification.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	// Nomes aleatórios pra batata
	potato_names: string[] = [
		'Batata', 'Batato', 'Batat', 'Batatinha hmmmmm', 
		'Potato', 'Patato', 'Pototo', 'Patata', 'Patoto', 'Potota', 'Potata', 'Potat',
		'Patat', 'Patato Pato',
	];

	potato_upgrades:any[] = [
		{cap:100 , message:'Uma nova batata foi liberada...',achieved: false },
		{cap:200 , message:'Você tem uma boca maior e pode comer 2x mais!',achieved: false },
		{cap:400 , message:'Mano tu tem tipo a boca do demo lá do IT, 4x vezes mais, só vai',achieved: false },
		{cap:800 , message:'O mundo tá rosa de tanto vc comer pqp vsf maluca',achieved: false },
		{cap:1600 , message:'...o que será que acontece em 3200 batatas?',achieved: false },
		{cap:3200 , message:'ehehehehehehehehehehehehehehhehehehehhehehhehehehhehehehhehe',achieved: false },
	];

	// Índice usado pra pegar o nome, pra evitar que o rand dê o mesmo resultado
	last_potato_index: number = 0;

	next_cap: number = this.potato_upgrades[0].cap;

	// Contador de toques 
	tap_counter: any = 0;

	modifier:number = 1;

	// Som de comidinha pra ficar legal
	eating_sound: any = new Pizzicato.Sound({
		source: 'file',
		options: {path: '../../assets/eat.mp3'},
	});

	fry_sound: any = new Pizzicato.Sound({
		source:'file',
		options: {path: '../../assets/tss.mp3'},
	});

	reverse_fry_sound: any = new Pizzicato.Sound({
		source:'file',
		options:{path:'../../assets/sst.mp3'},
	});

	final_music: any = new Pizzicato.Sound({
		source:'file',
		options:{path:'../../assets/final.mp3'}
	});
	
	constructor(public notification: PopoverController) {}

	public updatePotato():void {
		// Definindo mudança no título
		this.updatePotatoName();
		// Mudando a classe da batata
		this.updatePotatoAngle();
		// Tocando o som de comidinha
		this.eating_sound.play();
		// Atualizando o contador da batata
		this.updatePotatoCounter();
		// Lidando com o novo valor
		this.handlePotatoValueNotification(this.tap_counter)
	}

	private handlePotatoValueNotification(counter:number){
		let i = 0;
		for (let level of this.potato_upgrades){
			i++;
			if (counter >= level.cap && !level.achieved) {
				level.achieved = true;
				this.next_cap = this.potato_upgrades[i] ? this.potato_upgrades[i].cap : 'FELIZ ANIVERSÁRIO'
				this.presentNotification(level.message);
				if (level.cap === 200){
					this.modifier = 2;
				} else if (level.cap === 400){
					this.modifier = 4
				} else if (level.cap === 800) {
					this.modifier = 10;
					// document.getElementById('main').setAttribute( 'class', 'pink')
				} else if (level.cap === 1600){
					this.modifier = 69;
				} else if (level.cap === 3200){
					// document.getElementById('potato').hidden = true;
					// document.getElementById('main').setAttribute('class','meme')
					this.final_music.play()
				}
			}
		}
	}

	private updatePotatoCounter():void {
		this.tap_counter += this.modifier;
	}

	private updatePotatoName():void {
		let new_index:number = -1;
		do {
			new_index = Math.floor((Math.random() * 100) % this.potato_names.length )
		} while (new_index === this.last_potato_index && new_index === -1);
		this.last_potato_index = new_index;
	}

	private updatePotatoAngle():void{
		let batata = document.getElementById('potato')
		if(batata.className === "before")
			batata.setAttribute("class","after");
		else if (batata.className === "after")
			batata.setAttribute("class","before");
	}

	private updatePotatoSprite():void {
		let batata:any = document.getElementById('potato');
		console.log(batata.src)
		if (!batata.src.includes('fires.png')){
			batata.src = '../../assets/fires.png';
			this.fry_sound.play()
		}
		else if (!batata.src.includes('potato.png')){
			batata.src = '../../assets/potato.png';
			this.reverse_fry_sound.play()
		}
	}

	public async presentNotification(msg:string){
		const popover = await this.notification.create({
			component: PotatoNotificationComponent,
			componentProps: {'message': msg},
			event: event,
			translucent: true
		})
		return await popover.present();
	}

}
