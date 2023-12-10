import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

import { result as oneOne } from "./one/one.ts";
import { result as oneTwo } from "./one/two.ts";
import { result as twoOne } from "./two/one.ts";
import { result as twoTwo } from "./two/two.ts";
import { result as threeOne } from "./three/one.ts";
import { result as threeTwo } from "./three/two.ts";
import { result as fourOne } from "./four/one.ts";
import { result as fourTwo } from "./four/two.ts";
import { result as fiveOne } from "./five/one.ts";
import { result as sixOne } from "./six/one.ts";
import { result as sixTwo } from "./six/two.ts";
import { result as sevenOne } from "./seven/one.ts";
import { result as sevenTwo } from "./seven/two.ts";
import { result as eightOne } from "./eight/one.ts";
import { result as nineOne } from "./nine/one.ts";

Deno.test("Day One, Question One", () => {
  assertEquals(oneOne, 55834);
});

Deno.test("Day One, Question Two", () => {
  assertEquals(oneTwo, 53221);
});

Deno.test("Day Two, Question One", () => {
  assertEquals(twoOne, 2317);
});

Deno.test("Day Two, Question Two", () => {
  assertEquals(twoTwo, 74804);
});

Deno.test("Day Three, Question One", () => {
  assertEquals(threeOne, 554003);
});

Deno.test("Day Three, Question Three", () => {
  assertEquals(threeTwo, 87263515);
});

Deno.test("Day Four, Question One", () => {
  assertEquals(fourOne, 20117);
});

Deno.test("Day Four, Question Two", () => {
  assertEquals(fourTwo, 13768818);
});

Deno.test("Day Five, Question One", () => {
  assertEquals(fiveOne, 324724204);
});

Deno.test("Day Six, Question One", () => {
  assertEquals(sixOne, 500346);
});

Deno.test("Day Six, Question Two", () => {
  assertEquals(sixTwo, 42515755);
});

Deno.test("Day Seven, Question One", () => {
  assertEquals(sevenOne, 251927063);
});

Deno.test("Day Seven, Question Two", () => {
  assertEquals(sevenTwo, 255632664);
});

Deno.test("Day Eight, Question One", () => {
  assertEquals(eightOne, 20659);
});

// Deno.test("Day Nine, Question One", () => {
//   assertEquals(nineOne, 1647269739);
// });
