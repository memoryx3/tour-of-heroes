import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  onSelect(selectedHero: Hero) {
    this.selectedHero = selectedHero;
    this.messageService.add(`HeroesComponent: Selected hero id=${selectedHero.id}`)
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string) {
    name.trim();
    if (!name) return;
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  delete(hero: Hero) {
    const heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe(() => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

}
