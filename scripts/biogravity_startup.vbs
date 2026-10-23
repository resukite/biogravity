Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\ghpar\.gemini\antigravity\scratch\biogravity"
WshShell.Run "node scripts\daily_pc_startup_check.js", 0, False
