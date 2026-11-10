import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cleanTitle } from '../utils/cleanTitle.ts'

test('entfernt Hervorhebungen', () => {
  assert.equal(cleanTitle('Wann ist ein Modell **gut**?'), 'Wann ist ein Modell gut?')
  assert.equal(cleanTitle('Ein *gutes* Modell'), 'Ein gutes Modell')
  assert.equal(cleanTitle('Ein _gutes_ Modell'), 'Ein gutes Modell')
})

test('lässt Unterstriche in Wörtern und Inline-Code stehen', () => {
  assert.equal(cleanTitle('Variablen in snake_case'), 'Variablen in snake_case')
  assert.equal(cleanTitle('Konstruktoren mit `__init__`'), 'Konstruktoren mit __init__')
  assert.equal(cleanTitle('Pakete mit `npm` verwalten'), 'Pakete mit npm verwalten')
})

test('macht &shy; zum weichen Trennstrich', () => {
  assert.equal(cleanTitle('Geschäftsprozess&shy;modellierung'), 'Geschäftsprozess­modellierung')
})

test('verträgt leere und nicht textuelle Werte', () => {
  assert.equal(cleanTitle(undefined), '')
  assert.equal(cleanTitle(2026), '2026')
})
