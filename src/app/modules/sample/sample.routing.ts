import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { SampleComponent } from './sample.component';

export const SAMPLE_ROUTES: Routes = [
    {
        path: '',
        component: SampleComponent,
        children: [
            {
                path: 'demo',
                component: DemoComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(SAMPLE_ROUTES)],
    exports: [RouterModule]
})

export class SampleRoutingModule { }