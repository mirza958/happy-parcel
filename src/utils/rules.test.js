import test from 'node:test';
import assert from 'node:assert/strict';
import { checkCapacity, deliveryFee, selectionIssues } from './rules.js';
test('a normal selection fits', () => assert.equal(checkCapacity(4, 6), true));
test('exactly at the capacity fits', () => assert.equal(checkCapacity(6, 6), true));
test('one space above capacity is rejected', () => assert.equal(checkCapacity(7, 6), false));
test('invalid capacity inputs are rejected', () => { assert.equal(checkCapacity(-1, 6), false); assert.equal(checkCapacity(2.5, 6), false); });
test('delivery threshold is inclusive and areas are enforced', () => { assert.equal(deliveryFee('Islamabad', 3999), 250); assert.equal(deliveryFee('Rawalpindi', 4000), 0); assert.equal(deliveryFee('Lahore', 4500), null); });
test('restored stock and scent conflicts prevent completion', () => assert.equal(selectionIssues([{id:'candle', quantity:2}], [{id:'candle',name:'Candle',stock:1,slots:2,scented:true}], {capacity:6}, true).length,2));
