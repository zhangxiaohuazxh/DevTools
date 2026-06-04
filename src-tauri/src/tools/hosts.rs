use anyhow::Result;
use std::{env, fs, fs::File};
use std::{
    io::{Read, Write},
    process,
};
use tempfile::NamedTempFile;

fn get_hosts_path() -> &'static str {
    if cfg!(not(target_os = "windows")) {
        "/etc/hosts"
    } else {
        "C:/Windows/System32/drivers/etc/hosts"
    }
}

fn preview_hosts_mapping() -> anyhow::Result<String, Box<dyn std::error::Error>> {
    let mut content = String::new();
    File::open(get_hosts_path())?.read_to_string(&mut content)?;
    println!("读取到的内容\r\n {}", content);
    Ok(content)
}

fn modify_hosts_file(_content: String) -> Result<String, Box<dyn std::error::Error>> {
    let content =
        "127.0.0.1	localhost\r\n255.255.255.255	broadcasthost\r\n::1             localhost\r\n";
    let file = NamedTempFile::new_in(env::current_dir()?)?;
    fs::copy(get_hosts_path(), file.path())?;
    let mut variable_file = fs::OpenOptions::new()
        .read(true)
        .write(true)
        .open(file.path())?;
    // variable_file.seek(SeekFrom::Start(0))?;
    variable_file.write_all(content.as_bytes())?;
    variable_file.flush()?;
    if cfg!(target_os = "macos") {
        // macOS: 使用 osascript 弹出图形化 sudo 对话框
        // 注意：这里使用了 mv 命令将临时文件移动到 /etc/hosts
        let temp_path = file.path().to_str().unwrap();
        let status = process::Command::new("osascript")
            .args(&[
                "-e",
                &format!(
                    "do shell script \"mv {} /etc/hosts\" with administrator privileges",
                    temp_path
                ),
            ])
            .status()
            .map_err(|e| format!("macOS 提权失败: {}", e))?;
        println!("status {}", status);
    }
    variable_file.set_len(content.as_bytes().len() as u64)?;
    // chrome缓存 chrome://net-internals/?#dns
    Ok(content.to_string())
}

#[tauri::command]
pub fn preview_hosts_mapping_tauri() -> Result<String, String> {
    preview_hosts_mapping().map_err(|e| e.to_string())
}
