import os

def generate_directory_structure(path, prefix=""):
    """
    Génère la structure du répertoire sous forme de texte avec indentations.
    """
    structure = ""
    items = sorted(os.listdir(path))
    for i, item in enumerate(items):
        item_path = os.path.join(path, item)
        connector = "└── " if i == len(items) - 1 else "├── "
        structure += f"{prefix}{connector}{item}\n"
        if os.path.isdir(item_path):
            extension = "    " if i == len(items) - 1 else "│   "
            structure += generate_directory_structure(item_path, prefix + extension)
    return structure

def read_files_content(path):
    """
    Parcourt récursivement les fichiers dans le répertoire et lit leur contenu.
    """
    files_content = []
    for root, _, files in os.walk(path):
        for file in files:
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            relative_path = os.path.relpath(file_path, path)
            files_content.append({
                "path": relative_path,
                "content": content
            })
    return files_content

def transform_directory_to_context(path):
    """
    Transforme un dossier en contexte pour un prompt de l'IA.
    """
    context = {}

    # 1. Générer la structure du répertoire
    context['structure'] = generate_directory_structure(path)

    # 2. Lire le contenu des fichiers
    context['files'] = read_files_content(path)

    return context

def format_context(context):
    """
    Formate le contexte sous forme de texte lisible.
    """
    formatted_text = "## Structure:\n"
    formatted_text += f"```\n{context['structure']}```\n\n"
    
    formatted_text += "## Files and Content\n"
    for file in context['files']:
        formatted_text += f"path:\"{file['path']}\"\n"
        formatted_text += f"content:\"{file['content']}\"\n\n"
    
    return formatted_text

def write_context_to_file(formatted_text, output_file):
    """
    Écrit le texte formaté dans un fichier donné.
    """
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(formatted_text)

# Chemin du répertoire à transformer
directory_path = './app/lib/db/seed/data'
 

# Chemin du fichier de sortie   
output_file_path = './__cmd/tasks/prompt_context_g.md'

# Transformer le répertoire en contexte
context = transform_directory_to_context(directory_path)

# Formater le contexte sous forme de texte
formatted_text = format_context(context)

# Écrire le texte formaté dans le fichier de sortie
write_context_to_file(formatted_text, output_file_path)

# Affichage de confirmation
print(f"Le texte formaté a été écrit dans le fichier : {output_file_path}")