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

Preview:

-   `Archetype`

#### Blocks

Play:

-   `levelData`
-   `levelMemory`

Preview:

-   `previewData`

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

-   `defineOptions`
-   `defineSkin`

Play:

-   `defineArchetypes`
-   `defineBuckets`
-   `defineEffect`
-   `defineParticle`

Preview:

-   `defineArchetypes`

Tutorial:

-   `defineEffect`
-   `defineInstruction`
-   `defineParticle`

#### Enums

Play:

-   `Callback`
-   `EntityState`
-   `HorizontalAlign`
-   `Judgment`

Preview:

-   `Callback`
-   `HorizontalAlign`
-   `PrintColor`
-   `PrintFormat`
-   `Scroll`

Tutorial:

-   `NavigationDirection`
-   `TutorialCallback`

#### Ids

-   `SkinSpriteId`

Play:

-   `EffectClipId`
-   `ParticleEffectId`

Tutorial:

-   `EffectClipId`
-   `InstructionIconId`
-   `InstructionTextId`
-   `ParticleEffectId`

#### Instance ids

Play:

-   `LoopedEffectClipInstanceId`
-   `ParticleEffectInstanceId`
-   `ScheduledLoopedEffectClipInstanceId`
-   `TouchId`

Tutorial:

-   `LoopedEffectClipInstanceId`
-   `ParticleEffectInstanceId`
-   `ScheduledLoopedEffectClipInstanceId`

#### Misc

-   `compiler`
-   `debug`
-   `native`
-   `screen`
-   `ui`

Play:

-   `audio`
-   `background`
-   `bpmChanges`
-   `entityInfos`
-   `input`
-   `life`
-   `score`
-   `time`
-   `timeScaleChanges`
-   `touches`

Preview:

-   `bpmChanges`
-   `canvas`
-   `entityInfos`
-   `timeScaleChanges`

Tutorial:

-   `audio`
-   `background`
-   `navigation`
-   `time`
