import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "nav-item",
  templateUrl: "./nav-item.component.html",
})
export class NavItemComponent implements OnInit {
  @ViewChild("menu", {static: true}) menu: MatMenuModule;
  @Input() items: {value: string,name: string, children: string[]}[];

  constructor() {}

  ngOnInit() {}
}