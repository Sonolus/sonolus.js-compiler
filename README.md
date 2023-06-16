# Sonolus.js Compiler

Compiler for [Sonolus.js](https://github.com/Sonolus/sonolus.js)

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://wiki.sonolus.com)
-   [Sonolus.js](https://github.com/Sonolus/sonolus.js)
-   [Sonolus.js Guide](https://wiki.sonolus.com/sonolus.js-guide)

## Usage

Compiler is not meant to be used directly, instead use [Sonolus.js](https://github.com/Sonolus/sonolus.js).

## Limitations

Compiler is designed to compile only a subset of JavaScript, as a sizable portion of JS features are not needed for Sonolus engine scripting.

Notably, language features that do not exist in Sonolus runtime (strings, objects, arrays, etc) are only partially supported to the extend where they must be resolved at compile time.

## API

### Building and Assembling

#### Building

-   `buildMainTask`
-   `buildCompileTask`

#### Assembling

-   `assemble`

### Standard Library

#### Archetypes

-   `Archetype`
-   `SpawnableArchetype`

#### Blocks

-   `levelData`
-   `levelMemory`

#### Data types

-   `Collection`
-   `Container`
-   `ContainerType`
-   `DataType`
-   `Dictionary`
-   `Mat`
-   `Quad`
-   `Rect`
-   `Tuple`
-   `Vec`

#### Defines

-   `defineArchetypes`
-   `defineBuckets`
-   `defineEffect`
-   `defineLib`
-   `defineOptions`
-   `defineParticle`
-   `defineSkin`

#### Enums

-   `ArchetypeCallback`
-   `EntityState`
-   `HorizontalAlign`
-   `Judgment`

#### Ids

-   `EffectClipId`
-   `ParticleEffectId`
-   `SkinSpriteId`

#### Instance ids

-   `LoopedEffectClipInstanceId`
-   `ParticleEffectInstanceId`
-   `ScheduledLoopedEffectClipInstanceId`
-   `TouchId`

#### Misc

-   `audio`
-   `background`
-   `bpmChanges`
-   `compiler`
-   `debug`
-   `entityInfos`
-   `input`
-   `life`
-   `native`
-   `score`
-   `screen`
-   `time`
-   `timeScaleChanges`
-   `touches`
-   `ui`
