from pathlib import Path

BASE_DIR = Path("src")

folders = [
    # Config
    "config",

    # Modules
    "modules",

    # Shared
    "shared",
    "shared/constants",
    "shared/decorators",
    "shared/exceptions",
    "shared/filters",
    "shared/guards",
    "shared/interceptors",
    "shared/interfaces",
    "shared/pipes",
    "shared/utils",

    # Shared Infrastructure
    "shared/infrastructure",
    "shared/infrastructure/prisma",
    "shared/infrastructure/storage",
    "shared/infrastructure/websocket",
]

modules = [
    "auth",
    "users",
    "hymn",
    "program",
    "projection",
    "service-list",
    "background",
    "upload",
]

module_structure = [
    "application",
    "application/dto",
    "application/mappers",
    "application/services",
    "application/use-cases",

    "domain",
    "domain/entities",
    "domain/enums",
    "domain/interfaces",
    "domain/repositories",
    "domain/value-objects",

    "infrastructure",
    "infrastructure/prisma",
    "infrastructure/repositories",
    "infrastructure/persistence",

    "presentation",
    "presentation/controllers",
    "presentation/gateways",

    "tests",
]


def create_folder(path: Path):
    path.mkdir(parents=True, exist_ok=True)

    keep = path / ".gitkeep"
    keep.touch(exist_ok=True)


def create_module(module_name: str):
    module_root = BASE_DIR / "modules" / module_name

    create_folder(module_root)

    for item in module_structure:
        create_folder(module_root / item)

    module_file = (
        module_root
        / "presentation"
        / f"{module_name}.module.ts"
    )

    if not module_file.exists():
        module_file.write_text(
f"""import {{ Module }} from '@nestjs/common';

@Module({{}}
)
export class {to_pascal(module_name)}Module {{}}
""",
encoding="utf-8"
        )


def to_pascal(name: str):
    return "".join(
        part.capitalize()
        for part in name.replace("-", " ").split()
    )


def main():

    print("Creando estructura...")

    for folder in folders:
        create_folder(BASE_DIR / folder)

    for module in modules:
        create_module(module)

    print("")

    print("✅ Proyecto creado correctamente.")


if __name__ == "__main__":
    main()