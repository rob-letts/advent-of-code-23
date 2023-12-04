import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

import { result as oneOne } from "./one/one.ts";
import { result as oneTwo } from "./one/two.ts";
import { result as twoOne } from "./two/one.ts";
import { result as twoTwo } from "./two/two.ts";
import { result as threeOne } from "./three/one.ts";
import { result as threeTwo } from "./three/two.ts";
import { result as fourOne } from "./four/one.ts";
import { result as fourTwo } from "./four/two.ts";

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
