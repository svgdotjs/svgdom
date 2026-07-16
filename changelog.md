# Changelog

All notable changes to svgdom will be documented in this file.

## Unreleased

### Added

- Added selector support for `:empty`, `:has()`, `:is()`, `:where()`, nested functional pseudo-classes, and the `of <selector>` syntax for `:nth-child()` and `:nth-last-child()`.
- Added a `CSSStyleDeclaration` implementation for `Element.style` with `cssText`, custom properties, priorities, ordered enumeration, and synchronized style attributes.

### Changed

- Moved development and dependency management from npm to pnpm.

### Fixed

- Structural child pseudo-classes now count only element siblings and correctly support `An+B` formulas, including negative coefficients and whitespace.
- Fixed namespace-aware DOM creation, lookup, fragment parsing, and XML serialization, including inherited bindings, prefix collisions, namespaced attributes, CDATA, and foreign elements.
