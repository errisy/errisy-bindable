//test cases for errisy-bindable
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="index.ts" />
//import { obs, PathBindingMode } from './index';
var NativeElement = (function () {
    function NativeElement() {
    }
    Object.defineProperty(NativeElement.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            console.log("value of NativeElement is set to " + value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    return NativeElement;
}());
exports.NativeElement = NativeElement;
var Leg = (function () {
    function Leg() {
    }
    return Leg;
}());
__decorate([
    obs.property,
    __metadata("design:type", Number)
], Leg.prototype, "length", void 0);
Leg = __decorate([
    obs.bindable
], Leg);
exports.Leg = Leg;
var Dog = Dog_1 = (function () {
    function Dog() {
    }
    Dog.prototype.BeforeLegLengthChanged = function () {
        console.log('BeforeLegLengthChanged', arguments);
    };
    Dog.prototype.AfterLegLengthChanged = function () {
        console.log('AfterLegLengthChanged', arguments);
    };
    return Dog;
}());
__decorate([
    obs.property,
    __metadata("design:type", Leg)
], Dog.prototype, "leg", void 0);
__decorate([
    obs.property,
    __metadata("design:type", NativeElement)
], Dog.prototype, "native", void 0);
__decorate([
    obs.bind(function () { return Dog_1.prototype.leg.length; }, PathBindingMode.syncFrom)
        .before(function () { return Dog_1.prototype.BeforeLegLengthChanged; })
        .after(function () { return Dog_1.prototype.AfterLegLengthChanged; })
        .wrap(function () { return Dog_1.prototype.native.value; })
        .property,
    __metadata("design:type", Number)
], Dog.prototype, "legLength", void 0);
__decorate([
    obs.event,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Dog.prototype, "BeforeLegLengthChanged", null);
__decorate([
    obs.event,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Dog.prototype, "AfterLegLengthChanged", null);
Dog = Dog_1 = __decorate([
    obs.bindable
], Dog);
exports.Dog = Dog;
var TestCases = (function () {
    function TestCases() {
    }
    TestCases.prototype.bind = function () {
        var dog = new Dog();
        var leg = new Leg();
        var native = new NativeElement();
        dog.native = native;
        console.log('>>> Set dog.leg = leg');
        dog.leg = leg;
        var doc = obs.getDecorator(dog, 'leg', true);
        console.log('leg decorator: ', doc);
        console.log('>>> Set leg.length = 20');
        leg.length = 20;
        console.log('>>> Check dog.legLength: ', dog.legLength, ' <-- this means after you assign let to dog.leg, when you change leg.length, dog.legLength is automatically updated.');
        console.log('>>> Set dog.legLength = 30');
        dog.legLength = 30;
        console.log('>>> Check leg.length: ', leg.length);
    };
    return TestCases;
}());
var t = new TestCases();
t.bind();
var Dog_1;
//# sourceMappingURL=test.js.map