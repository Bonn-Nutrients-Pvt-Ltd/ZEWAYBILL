/*global QUnit*/
import Controller from "zirnview/controller/Grid.controller";

QUnit.module("Grid Controller");

QUnit.test("I should test the Grid controller", function (assert: Assert) {
	const oAppController = new Controller("Grid");
	oAppController.onInit();
	assert.ok(oAppController);
});