#!/usr/bin/env nix-shell
//! ```cargo
//! [dependencies]
//! tokio = { version = "1", features = ["full"] }
//! tokio-postgres = "0.7"
//! csv = "1"
//! serde = { version = "1", features = ["derive"] }
//! rusqlite = { version = "0.31.0", features = ["bundled"] }
//! ```
/*
#!nix-shell -i rust-script -p rustc -p rust-script -p cargo
*/

use csv::Writer;
use rusqlite::{Connection, Error as SqliteError};
use serde::Serialize;

#[derive(Serialize)]
struct FireRecord {
    // Define the structure of your Fire record
    // This example includes only a few fields. Adjust according to your table's structure.
    id: i32,
    date: String,
    description: String,
}

fn main() -> Result<(), SqliteError> {
    // Open a connection to the SQLite database file
    let conn = Connection::open("fires.sqlite")?;

    // Get the list of states from the "Fires" table.
    let states: Vec<String> = conn
        .prepare("SELECT DISTINCT STATE FROM Fires")?
        .query_map([], |row| row.get(0))?
        .collect::<Result<Vec<String>, _>>()?;

    for state in states {
        // Query fires by state
        let mut stmt = conn.prepare("SELECT id, date, description FROM Fires WHERE STATE = ?")?;
        let fire_records = stmt.query_map([state.as_str()], |row| {
            Ok(FireRecord {
                id: row.get(0)?,
                date: row.get(1)?,
                description: row.get(2)?,
            })
        })?;

        // Convert query results to FireRecord instances
        let fires: Vec<FireRecord> = fire_records
            .map(|res| res.unwrap()) // Unwrap Result
            .collect::<Vec<FireRecord>>();

        // Write to CSV
        let file_name = format!("{}.csv", state);
        let mut wtr = match Writer::from_path(file_name) {
            Ok(writer) => writer,
            Err(err) => return Err(SqliteError::from(format!("CSV Writer Error: {}", err))),
        };

        for fire in fires {
            // Serialize each record, handling errors
            match wtr.serialize(fire) {
                Ok(_) => (),
                Err(err) => return Err(SqliteError::from(format!("CSV Serialization Error: {}", err))),
            }
        }

        // Flush CSV writer, handling errors
        match wtr.flush() {
            Ok(_) => (),
            Err(err) => return Err(SqliteError::from(format!("CSV Flush Error: {}", err))),
        }
    }

    Ok(())
}
