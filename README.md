# npm-stats

A CLI tool for viewing advanced download statistics and metadata for npm packages.

This tool uses the npm registry and downloads apis to fetch metadata and download stats about the given packages.

## Example
![npm-stats example image](/docs/example.png) 

## Architecture

```
npm-stats/
├── src/            # Source code
│   ├── commands/   # Core command logic files
│   ├── services/   # Third party services (npm apis)
│   ├── utils/      # Global utils
│   └── index.ts    # CLI entry point
├── package.json
├── README.md
└── tsconfig.json
```

## Installation

```bash
npm i -g @lewiej08/npm-stats
```

## Usage 

```bash
npmstats [pkg]
```