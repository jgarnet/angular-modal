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
data | any | Data which will populate the Component's @Input() fields
dismissableMask | boolean | Determines whether clicking the Modal container mask will close the Modal
styles | {} | Allows custom styling to be assigned to the Modal instance

Example:

`TestComponent`:

```
@Component()
public class TestComponent {
    @Input() inputA: string;
    @Input() inputB: number;
}
```

`TestService`:

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
            dismissableMask: false,
            styles: {
                backgroundColor: '#eee'
            }
        });
    }
}
```
