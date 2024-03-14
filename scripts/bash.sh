process_directory() {
    for zip_file in "$1"amplify-builds/*.zip; do
        if [ -f "$zip_file" ]; then
            initial_size=$(du -sh $zip_file)
            echo "Processing: $zip_file $initial_size"
            unzip -q "$zip_file" -d "${zip_file%.zip}"
            rm -rf "${zip_file%.zip}/node_modules"
            yes | zip -qry "$zip_file" "${zip_file%.zip}"
            rm -rf "${zip_file%.zip}"
            echo "Processed: $zip_file $(du -sh $zip_file)"
        fi
    done
}

# Main function to iterate through directories
main() {
    # Change this to the directory containing your directories with zip files
    base_dir="./lib/amplify-export-edcsquared/function"

    # Iterate through each directory
    for dir in "$base_dir"/*/; do
        if [ -d "$dir" ]; then
            process_directory "$dir"
        fi
    done
}

# Execute main function
main