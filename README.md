# errisy-bindable 
* the native JavaScript object-to-object binding via TypeScript decorators with out-of-box type-to-type serialization-deserialztion solution.

Well, of course you can also set up the bindings with JavaScript only without TypeScript. But like what you normally do with Angular2 projects, with TypeScript, it is a lot earsier.

to install errisy-bindable

```
npm install errisy-bindable
```

## Why?
Many javascript framework has the binding feature for HMTL templates, such AngularJS, KnockoutJS, etc. But with the power of typescript decorators, it is possible to set up object to object bindings with simple decorator codes.

Bindings and Events are the basis of UI automation. This project was inspired by the concept of WPF(Windows Presentation Foundation). When I try to apply MVVM pattern to canvas UI framework such as EaselJS, I found that I must set up a higher level of automation and abstraction of the EaselJS APIs to achieve MVVM. So I developed errisy-bindable.

I believe that I can also apply errisy-bindable on native HTMLElements or frameworks such as React as well to achieve simple MVVM pattern.

This native JavaScript two-way binding framework offers a front-end UI style that is very similar to WPF MVVM two-way bindings.

## What does it do?

### object-to-object binding
There is no real object-to-object binding in most of the front end frameworks such as Angular or Knockout. The bindings are only between UI field/presentation and the object (at least in the case of Angular 1 & 2).

What is real object-to-object binding? It means when binding is set up, changing the value of one object will affect the bound property and vice versa.

### weak binding to field (not to object itself).
If you have object A, and you set up A.x binding to A.y, where A.y is a property that anything can be assigned to there.
So errisy-bindable ensures that when you set another object to A.y, the A.x will be automatically updated to the new object.

### observe collection and subscribe collection events
Similar to previous case, you can set up A.x to observe the collection A.y, and listen the event of every element in A.y.


### That's pretty much all you need to build your own MVVM on top of any UI framework.



## How does it work?
bindable ts enables simple binding set up with member decorators
@obs.bind(()
### Set up binding simply and specify behaviors of a property with before/after etc.
```typescript
@obs.bindable 
class Person {
    @obs.property
    public Name: string;
    @obs
      .bind(()=>Person.prototyope.Name.FirstName)
      .before(()=>Person.prototype.beforeFirstNameChange)
      .after(()=>Person.prototype.FirstNameChanged)
      .property
    public FirstName: string;
    @obs.event
    public beforeFirstNameChange = () => {
        console.log('before first name is changed.');
    }
    @obs.event
    public FirstNameChanged = () => {
        console.log('first name is changed.');
    }
}
@obs.bindable
class Name{
    @obs.property
    public Surname: string;
    @obs.property
    public FirstName: string;
}

let p = new Person();
p.FirstName = 'Jack'; // p.Name.FirstName will change as well.
```

### Observe an Observable Array
ObservableArray is another feature of the bindable ts. It can monitor another ObservableArray (ObservationSource), transform the elements with observer, and keep the transformed elements in it. It can also transform its own elements with populator and write into the PopulationTarget array.
```typescript
@obs.bindable 
class Bird {
    @obs.property
    public Name: string;
}
@obs.bindable
class Branch {
    @obs.observable(ObservableArray).property
    public birds: ObservableArray<Bird>;
}
@obs.bindable
class host {
    @obs.property
    branch: Branch;
    @obs.observable(ObservableArray).default(()=>ObservableArray.prototype.parent).observe(() => host.prototype.branch.birds).property 
    public catched: ObservableArray<Bird>;
}

let h = new host();
console.log('just initialized', h.branch?h.branch.birds.asArray():null, h.catched.asArray());
h.branch = new Branch();
console.log('after set branch', h.branch.birds.asArray(), h.catched.asArray());
h.branch.birds.push(obs.new(new Bird(), b => b.Name = 'macaw'));

console.log('after add macaw', h.branch.birds.asArray(), h.catched.asArray());
```

### Set up event listener

```typescript
@obs.bindable
class base {
    @obs.property
    seed0: sender = new sender();

    @obs.listen(()=>base.prototype.seed0.tick).event
    method = () => {
        console.log('--- base.method invoked ---');
    }
}
@obs.bindable
class host extends base {
    @obs.property
    seed1: sender = new sender();
    @obs.property
    seed2: sender = new sender();


    @obs
      .listen(()=>host.prototype.seed1.tick, ()=>host.prototype.seed2.tick) //the event can listen multiple sources
      .event
    method = () => {
        console.log('--- host.method invoked ---');
    }
}
@obs.bindable
class sender {
    @obs.event
    public tick = () => {
    }
}

let h = new host();
console.log('h.seed0.tick()');
h.seed0.tick();
console.log('h.seed1.tick()');
h.seed1.tick();
console.log('h.seed2.tick()');
h.seed2.tick();

```
