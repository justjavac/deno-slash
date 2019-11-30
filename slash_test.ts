import { test } from "https://deno.land/std@v0.24.0/testing/mod.ts";
import { assertEquals } from "https://deno.land/std@v0.24.0/testing/asserts.ts";

import slash from "./mod.ts";

test({
  name: "convert backwards-slash paths to forward slash paths",
  fn(): void {
    assertEquals(slash("c:/aaaa\\bbbb"), "c:/aaaa/bbbb");
    assertEquals(slash("c:\\aaaa\\bbbb"), "c:/aaaa/bbbb");
  }
});

test({
  name: "not convert extended-length paths",
  fn(): void {
    const path = "\\\\?\\c:\\aaaa\\bbbb";
    assertEquals(slash(path), path);
  }
});

test({
  name: "not convert paths with Unicode",
  fn(): void {
    const path = "c:\\aaaa\\bbbb\\★";
    assertEquals(slash(path), path);
  }
});
