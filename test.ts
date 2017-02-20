//test cases for errisy-bindable

/// <reference path="index.ts" />

//import { obs, PathBindingMode } from './index';

export class NativeElement {
    private _value: string;
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        console.log(`value of NativeElement is set to ${value}`);
        this._value = value;
    }
}

@obs.bindable
export class Leg {
    @obs.property
    public length: number;
}

 

@obs.bindable
export class Dog   {

    @obs.property public leg: Leg;
    @obs.property public native: NativeElement;

    @obs.bind(() => Dog.prototype.leg.length, PathBindingMode.syncFrom)
        .before(() => Dog.prototype.BeforeLegLengthChanged)
        .after(() => Dog.prototype.AfterLegLengthChanged)
        .wrap(() => Dog.prototype.native.value)
        .property
    public legLength: number;

    @obs.event
    public BeforeLegLengthChanged() {
        console.log('BeforeLegLengthChanged', arguments);
    }

    @obs.event
    public AfterLegLengthChanged() {
        console.log('AfterLegLengthChanged', arguments);
    }
}


class TestCases {


    public bind() {
        let dog = new Dog();
        let leg = new Leg();
        let native = new NativeElement();
        dog.native = native;

        console.log('>>> Set dog.leg = leg');
        dog.leg = leg;

        let doc = obs.getDecorator(dog, 'leg', true);

        console.log('leg decorator: ', doc);

        console.log('>>> Set leg.length = 20');
        leg.length = 20;

        console.log('>>> Check dog.legLength: ', dog.legLength, ' <-- this means after you assign let to dog.leg, when you change leg.length, dog.legLength is automatically updated.');

        console.log('>>> Set dog.legLength = 30');
        dog.legLength = 30;

        console.log('>>> Check leg.length: ', leg.length);
    }

}


let t = new TestCases();
t.bind();