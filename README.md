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

Play:

-   `Archetype`
-   `SpawnableArchetype`

#### Blocks

Play:

-   `levelData`
-   `levelMemory`

Tutorial:

-   `tutorialData`
-   `tutorialMemory`

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

-   `defineEffect`
-   `defineLib`
-   `defineOptions`
-   `defineParticle`
-   `defineSkin`

Play:

-   `defineArchetypes`
-   `defineBuckets`

Tutorial:

-   `defineInstruction`

#### Enums

-   `EntityState`
-   `HorizontalAlign`
-   `Judgment`

Play:

-   `ArchetypeCallback`

Tutorial:

-   `NavigationDirection`

#### Ids

-   `EffectClipId`
-   `ParticleEffectId`
-   `SkinSpriteId`

Tutorial:

-   `InstructionIconId`
-   `InstructionTextId`

#### Instance ids

-   `LoopedEffectClipInstanceId`
-   `ParticleEffectInstanceId`
-   `ScheduledLoopedEffectClipInstanceId`

Play:

-   `TouchId`

#### Misc

-   `audio`
-   `background`
-   `compiler`
-   `debug`
-   `native`
-   `screen`
-   `time`
-   `ui`

Play:

-   `bpmChanges`
-   `entityInfos`
-   `input`
-   `life`
-   `score`
-   `timeScaleChanges`
-   `touches`

Tutorial:

-   `navigation`
