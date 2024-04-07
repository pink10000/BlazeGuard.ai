#! /usr/bin/env nix-shell
#! nix-shell -i bash -p sqlite
#!/usr/bin/env bash

# Path to your SQLite database file
DB_FILE="/home/samir/Downloads/Data/FPA_FOD_20221014.sqlite"

# Get unique state codes
STATES=$(sqlite3 "$DB_FILE" "SELECT DISTINCT STATE FROM Fires;")

for STATE in $STATES; do
    # Trim whitespace
    STATE_TRIMMED=$(echo "$STATE" | xargs)
    
    # Skip empty lines
    if [ -z "$STATE_TRIMMED" ]; then
        continue
    fi

    # Query to select records by state and export to CSV
    sqlite3 -header -csv "$DB_FILE" "SELECT * FROM Fires WHERE STATE = '$STATE_TRIMMED';" > "./state_fires/${STATE_TRIMMED}.csv"
done
