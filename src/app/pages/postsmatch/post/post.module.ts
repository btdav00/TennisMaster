import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PostPageRoutingModule
    ],
    exports: [
        PostPage
    ],
    declarations: [PostPage]
})
export class PostPageModule {}
