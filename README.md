# Angular Modal

Provides a simple, minimal configuration modal implementation.

## Installation

```bash
npm install angular-modal-simple
```

## Version Support

Angular 10.1+

## Use

Import `AngularModalModule` into your application:

```
@NgModule({
    ...
    imports: [
        AngularModalModule.forRoot()
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

Property | Type | Description | Default
---------|------|------------ | -------
canClose | boolean | Determines whether the user can close the Modal | true
data | any | Data which will populate the Component's @Input() fields | {}
dismissibleMask | boolean | Determines whether clicking the Modal container mask will close the Modal | true
styles | {} | Allows custom styling to be assigned to the Modal instance | {}
zIndex | number | The zIndex for the given Modal instance | 0

`ModalService.setDefaultOptions()` can be used to define the default `ModalOptions` for all Modal instances.

### ModalService:

Function | Parameters | Description
-------- | ---------- | -----------
display | component: any, options: ModalOptions | Displays the provided Component, using the provided ModalOptions (if present). Any properties that are not present in `options` will utilize the defaults provided in `ModalService`
close | component: any | Closes the provided Component instance
closeAll | - | Closes all open Modal instances
isActive | component: any | Determines if the provided Component is currently open in a Modal instance
setDefaultOptions | options: ModalOptions | Sets the default `ModalOptions` that will be used for each new Modal instance
setViewContainerRef | viewContainerRef: ViewContainerRef | Sets the `ViewContainerRef` that new Modal instances will be injected into (by default, `ModalService` will utilize `ApplicationRef` and inject all Modal instances into the `<body>` element)

### Example:

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
