# Changelog

All notable changes to svgdom will be documented in this file.

## Unreleased

### Fixed

- Preserved DOM tree mutation invariants by validating edits atomically, adopting cross-document subtrees, and maintaining parent and owner links.
- Kept `CharacterData.data` and `nodeValue` synchronized and corrected range-based mutation methods.
- Corrected recursive node normalization and structural equality without mutating compared trees.
- Made document types safely assignable, reusable after failed document creation, and metadata-preserving.
- Preserved node subtype state, ownership, attributes, and namespace-unaware names when cloning.
- Made XML fragment and document parsing transactional while retaining namespaces, CDATA, and doctype metadata.
- Made `outerHTML` replacement atomic for attached elements and a no-op for detached elements.

## 0.1.27 - 2026-07-18

### Changed

- Documented common server-side, testing, and asset-pipeline use cases for svgdom.

### Fixed

- Fixed `getBoundingClientRect()` for SVG elements embedded under plain HTML parents.
- Bounded arc-length approximation to prevent stack overflows and return finite lengths for difficult arcs.
- Preserved extrema of nearly quadratic cubic curves in path bounding boxes.
- Included `letter-spacing` when calculating text bounding boxes.

## 0.1.26 - 2026-07-17

### Changed

- Raised the minimum supported Node.js version to 22.13, allowing CommonJS consumers to load svgdom directly with `require()`.
- Updated `image-size` and Mocha, removed the obsolete webpack toolchain, and patched transitive test dependencies.

## 0.1.25 - 2026-07-16

### Added

- Added selector support for `:empty`, `:has()`, `:is()`, `:where()`, nested functional pseudo-classes, and the `of <selector>` syntax for `:nth-child()` and `:nth-last-child()`.
- Added a `CSSStyleDeclaration` implementation for `Element.style` with `cssText`, custom properties, priorities, ordered enumeration, and synchronized style attributes.

### Changed

- Moved development and dependency management from npm to pnpm.
- Separated semantic linting with ESLint from code formatting with Prettier.

### Fixed

- Structural child pseudo-classes now count only element siblings and correctly support `An+B` formulas, including negative coefficients and whitespace.
- Fixed namespace-aware DOM creation, lookup, fragment parsing, and XML serialization, including inherited bindings, prefix collisions, namespaced attributes, CDATA, and foreign elements.
