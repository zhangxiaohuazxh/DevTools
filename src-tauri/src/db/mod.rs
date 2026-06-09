use anyhow::Ok;
use rusqlite::{params, Connection, Result};
use std::sync::{Mutex, OnceLock};

static GLOBAL_DB: OnceLock<Mutex<Connection>> = OnceLock::new();

pub fn init_db(path: &str) {
    GLOBAL_DB.get_or_init(|| {
        let connection = Connection::open(path).expect("创建数据库失败");
        Mutex::new(connection)
    });
}

pub fn get_connection() -> std::sync::MutexGuard<'static, Connection> {
    GLOBAL_DB
        .get()
        .expect("数据库未初始化！请先调用 init_global_db")
        .lock()
        .expect("获取数据库锁失败")
}

pub fn check_table_exists(tab_name: &str) -> bool {
    let connection = get_connection();
    let res: i8 = connection
        .query_row(
            "SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name = ?1",
            [tab_name],
            |row| row.get(0),
        )
        .expect("sql执行出错");
    res > 0
}

#[cfg(test)]
mod test {
    use super::init_db;
    use crate::db::{check_table_exists, get_connection};

    #[test]
    pub fn test_tab_exists() {
        init_db("local.db");
        let res = check_table_exists("t_person");
        println!("res {res}");
    }

    #[test]
    pub fn test_create_tab() {
        init_db("local.db");
        if !check_table_exists("t_person") {
            let res = get_connection()
                .execute(
                    "create table t_person (id int primary key, name text not null )",
                    (),
                )
                .expect("创建表失败");
            println!("res {res}");
        }
        let res = get_connection()
            .execute("insert into t_person (id,name) values(?1,?2)", (1, "test"))
            .expect("插入数据出错");
        println!("res {res}");
    }
}
