; "Open in Paterm" shell verbs for folders, folder backgrounds, and drives.
; HKCU matches installer currentUser scope. %V = clicked path.
; NoWorkingDirectory keeps Explorer from overriding %V (System32 on Drive).

!macro NSIS_HOOK_POSTINSTALL
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenInPaterm" "" "Open in Paterm"
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenInPaterm" "Icon" '"$INSTDIR\paterm.exe",0'
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenInPaterm" "NoWorkingDirectory" ""
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenInPaterm\command" "" '"$INSTDIR\paterm.exe" "%V"'

  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenInPaterm" "" "Open in Paterm"
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenInPaterm" "Icon" '"$INSTDIR\paterm.exe",0'
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenInPaterm" "NoWorkingDirectory" ""
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenInPaterm\command" "" '"$INSTDIR\paterm.exe" "%V"'

  WriteRegStr HKCU "Software\Classes\Drive\shell\OpenInPaterm" "" "Open in Paterm"
  WriteRegStr HKCU "Software\Classes\Drive\shell\OpenInPaterm" "Icon" '"$INSTDIR\paterm.exe",0'
  WriteRegStr HKCU "Software\Classes\Drive\shell\OpenInPaterm" "NoWorkingDirectory" ""
  WriteRegStr HKCU "Software\Classes\Drive\shell\OpenInPaterm\command" "" '"$INSTDIR\paterm.exe" "%V"'
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
  DeleteRegKey HKCU "Software\Classes\Directory\shell\OpenInPaterm"
  DeleteRegKey HKCU "Software\Classes\Directory\Background\shell\OpenInPaterm"
  DeleteRegKey HKCU "Software\Classes\Drive\shell\OpenInPaterm"
!macroend
