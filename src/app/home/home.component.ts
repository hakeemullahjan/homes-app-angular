import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Filter by city"
          id="filtered"
          #filtered
        />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filtered.value)"
        >
          Search
        </button>
        <h3>{{ filtered.value }}</h3>
      </form>

      <!-- <div>
        <input type="text" id="first_name" name="first_name" #first_name />
      </div>
      <h3>{{ first_name.value }}</h3>
      <button type="button" (click)="setValue(first_name.value)">Go</button> -->
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredHousingLocationList"
        [housingLocation]="housingLocation"
      >
      </app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredHousingLocationList: HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);

  first_name: string = "";
  setValue(first_name: string) {
    console.log("First Name: ", first_name);
  }

  constructor() {
    this.housingService.getAllHousingLocations().then((data) => {
      this.housingLocationList = data;
      this.filteredHousingLocationList = data;
    });
  }

  filterResults(text: string) {
    console.log("TEXT", text);
    if (!text) this.filteredHousingLocationList = this.housingLocationList;

    this.filteredHousingLocationList = this.housingLocationList.filter((hl) =>
      hl.city.toLocaleLowerCase().includes(text.toLowerCase())
    );
  }
}
