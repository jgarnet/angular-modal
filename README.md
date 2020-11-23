# Angular Modal

Provides a simple, minimal configuration modal implementation.

## Installation

```bash
npm install angular-modal-simple
```

## Use

Import `AngularModalModule` into your application:

```
@NgModule({
    ...
    imports: [
        AngularModalModule
    ]
    ...
})
```

Add `ModalComponent` to your application:

```angular2html
<router-outlet></router-outlet>
...
<ngm-modal></ngm-modal>
```

Import `ModalService` to display ModalComponents.

```
@Injectable()
public class TestService {
    constructor(private modalService: ModalService) {}
    displayTest(): void {
        this.modalService.display(TestComponent);
    }
}
```

## Configuration Options

`ModalOptions` configuration options include:

Property | Type | Description
---------|------|------------
canClose | boolean | Determines whether the user can close the Modal
data | any | Any inputted data to be passed to the Component reference
dismissableMask | boolean | Determines whether clicking the Modal container mask will close the Modal

Example:

```
@Injectable()
public class TestService {
    constructor(private modalService: ModalService) {}
    displayTest(): void {
        this.modalService.display(TestComponent, {
            data: {
                inputA: 'test',
                inputB: 3
            },
            dismissableMask: false
        });
    }
}
```
