(function() {
  const data = {
    language: 'powershell',
    prepare: [
      {
        pat: /\:\/\//gm,
        rep: '\:\/\\\/'
      }
    ],
    execute: [
      {
        custom: '[\'](.*?)[\']',
        pat: /[\$][\(](.*?)[\)]/gm,
        rep: '\'$&\''
      },
      {
        custom: '[\"](.*?)[\"]',
        pat: /[\$][\(](.*?)[\)]/gm,
        rep: '\"$&\"'
      },
      {
        keyword: /([\'](.*?)[\']|[\"](.*?)[\"])/gm,
        rep: '<span id="value">$&</span>'
      },
      {
        keyword: /\b(Add-Computer|Add-Content|Add-History|Add-JobTrigger|Add-Member|Add-PSSnapin|Add-Type|Checkpoint-Computer|Clear-Content|Clear-EventLog|Clear-History|Clear-Host|Clear-Item|Clear-ItemProperty|Clear-Variable|Compare-Object|Complete-Transaction|Connect-PSSession|Connect-WSMan|Convert-Path|ConvertFrom-Csv|ConvertFrom-Json|ConvertFrom-SecureString|ConvertFrom-StringData|ConvertTo-Csv|ConvertTo-Html|ConvertTo-Json|ConvertTo-SecureString|ConvertTo-Xml|Copy-Item|Copy-ItemProperty|Debug-Process|Disable-ComputerRestore|Disable-JobTrigger|Disable-PSBreakpoint|Disable-PSRemoting|Disable-PSSessionConfiguration|Disable-WSManCredSSP|Disconnect-PSSession|Disconnect-WSMan|Disable-ScheduledJob|Enable-ComputerRestore|Enable-JobTrigger|Enable-PSBreakpoint|Enable-PSRemoting|Enable-PSSessionConfiguration|Enable-ScheduledJob|Enable-WSManCredSSP|Enter-PSSession|Exit-PSSession|Export-Alias|Export-Clixml|Export-Console|Export-Counter|Export-Csv|Export-FormatData|Export-ModuleMember|Export-PSSession|ForEach-Object|Format-Custom|Format-List|Format-Table|Format-Wide|Get-Acl|Get-Alias|Get-AuthenticodeSignature|Get-ChildItem|Get-Command|Get-ComputerRestorePoint|Get-Content|Get-ControlPanelItem|Get-Counter|Get-Credential|Get-Culture|Get-Date|Get-Event|Get-EventLog|Get-EventSubscriber|Get-ExecutionPolicy|Get-FormatData|Get-Host|Get-HotFix|Get-Help|Get-History|Get-IseSnippet|Get-Item|Get-ItemProperty|Get-Job|Get-JobTrigger|Get-Location|Get-Member|Get-Module|Get-PfxCertificate|Get-Process|Get-PSBreakpoint|Get-PSCallStack|Get-PSDrive|Get-PSProvider|Get-PSSession|Get-PSSessionConfiguration|Get-PSSnapin|Get-Random|Get-ScheduledJob|Get-ScheduledJobOption|Get-Service|Get-TraceSource|Get-Transaction|Get-TypeData|Get-UICulture|Get-Unique|Get-Variable|Get-Verb|Get-WinEvent|Get-WmiObject|Get-WSManCredSSP|Get-WSManInstance|Group-Object|Import-Alias|Import-Clixml|Import-Counter|Import-Csv|Import-IseSnippet|Import-LocalizedData|Import-PSSession|Import-Module|Invoke-AsWorkflow|Invoke-Command|Invoke-Expression|Invoke-History|Invoke-Item|Invoke-RestMethod|Invoke-WebRequest|Invoke-WmiMethod|Invoke-WSManAction|Join-Path|Limit-EventLog|Measure-Command|Measure-Object|Move-Item|Move-ItemProperty|New-Alias|New-Event|New-EventLog|New-IseSnippet|New-Item|New-ItemProperty|New-JobTrigger|New-Object|New-Module|New-ModuleManifest|New-PSDrive|New-PSSession|New-PSSessionConfigurationFile|New-PSSessionOption|New-PSTransportOption|New-PSWorkflowExecutionOption|New-PSWorkflowSession|New-ScheduledJobOption|New-Service|New-TimeSpan|New-Variable|New-WebServiceProxy|New-WinEvent|New-WSManInstance|New-WSManSessionOption|Out-Default|Out-File|Out-GridView|Out-Host|Out-Null|Out-Printer|Out-String|Pop-Location|Push-Location|Read-Host|Receive-Job|Register-EngineEvent|Register-ObjectEvent|Register-PSSessionConfiguration|Register-ScheduledJob|Register-WmiEvent|Remove-Computer|Remove-Event|Remove-EventLog|Remove-Item|Remove-ItemProperty|Remove-Job|Remove-JobTrigger|Remove-Module|Remove-PSBreakpoint|Remove-PSDrive|Remove-PSSession|Remove-PSSnapin|Remove-TypeData|Remove-Variable|Remove-WmiObject|Remove-WSManInstance|Rename-Computer|Rename-Item|Rename-ItemProperty|Reset-ComputerMachinePassword|Resolve-Path|Restart-Computer|Restart-Service|Restore-Computer|Resume-Job|Resume-Service|Save-Help|Select-Object|Select-String|Select-Xml|Send-MailMessage|Set-Acl|Set-Alias|Set-AuthenticodeSignature|Set-Content|Set-Date|Set-ExecutionPolicy|Set-Item|Set-ItemProperty|Set-JobTrigger|Set-Location|Set-PSBreakpoint|Set-PSDebug|Set-PSSessionConfiguration|Set-ScheduledJob|Set-ScheduledJobOption|Set-Service|Set-StrictMode|Set-TraceSource|Set-Variable|Set-WmiInstance|Set-WSManInstance|Set-WSManQuickConfig|Show-Command|Show-ControlPanelItem|Show-EventLog|Sort-Object|Split-Path|Start-Job|Start-Process|Start-Service|Start-Sleep|Start-Transaction|Start-Transcript|Stop-Computer|Stop-Job|Stop-Process|Stop-Service|Stop-Transcript|Suspend-Job|Suspend-Service|Tee-Object|Test-ComputerSecureChannel|Test-Connection|Test-ModuleManifest|Test-Path|Test-PSSessionConfigurationFile|Trace-Command|Unblock-File|Undo-Transaction|Unregister-Event|Unregister-PSSessionConfiguration|Unregister-ScheduledJob|Update-FormatData|Update-Help|Update-List|Update-TypeData|Use-Transaction|Wait-Event|Wait-Job|Wait-Process|Where-Object|Write-Debug|Write-Error|Write-EventLog|Write-Host|Write-Output|Write-Progress|Write-Verbose|Write-Warning)\b/gm,
        rep: '<span id="reserved">$&</span>'
      },
      {
        keyword: /\b(if|else|foreach|return|function|do|while|until|elseif|begin|for|trap|data|dynamicparam|end|break|throw|param|continue|finally|in|switch|exit|filter|try|process|catch)\b/gm,
        rep: '<span id="parameter">$&</span>'
      },
      {
        keyword: /([\w]+)(?=[\(])/gm,
        rep: '<span id="selector">$&</span>'
      },
      {
        custom: '[\\\[](.*?)[\\\]]',
        pat: /([\w]+)/gm,
        rep: '<span id="attribute">$&</span>'
      },
      {
        keyword: /(-ne|-eq|-lt|-gt|-ge|-le|-not|-like|-notlike|-match|-notmatch|-contains|-notcontains|-in|-notin|-replace)/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        keyword: /([\-]?)(\b[0][Xx][a-fA-F\d]+|([\#]?\b[\d]+([\.][\d]*)?\b|[\.][\d]+)([Ee][\-\+]?[\d]+)?)([\%]|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?/gm,
        rep: '<span id="unit">$&</span>'
      },
      {
        keyword: /[\#].+/gm,
        rep: '<span id="comment">$&</span>'
      },
      {
        nested: 'comment',
        begin: '&lt;[\#]',
        end: '[\#]&gt;'
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\']', exclude: true},
        end: {pat: '[\'][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]value[\"][\>][\"]', exclude: true},
        end: {pat: '[\"][\<][\/]span[\>]', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '[\<]span\\sid[\=][\"]comment[\"][\>][\#]', exclude: true},
        end: {pat: '[\<][\/]span[\>]$', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        begin: {pat: '(&lt;[\#])\<span\\sid\=\"block\"\>', exclude: true},
        end: {pat: '\<\/span\>([\#]&gt;)', exclude: true},
        pat: /(\<span(.*?)\>|\<\/span\>)/gm,
        rep: ''
      },
      {
        custom: '[\'][\<][\/]span[\>][\$][\(]',
        pat: /[\'][\<][\/]span[\>]/gm,
        rep: '<\/span>'
      },
      {
        custom: '[\)][\<]span(.*?)[\>][\']',
        pat: /[\<]span(.*?)[\>][\']/gm,
        rep: '<span id="value">'
      },
      {
        custom: '[\"][\<][\/]span[\>][\$][\(]',
        pat: /[\"][\<][\/]span[\>]/gm,
        rep: '<\/span>'
      },
      {
        custom: '[\)][\<]span(.*?)[\>][\"]',
        pat: /[\<]span(.*?)[\>][\"]/gm,
        rep: '<span id="value">'
      }
    ],
    finalise: [
      {
        pat: /\:\/\\\//gm,
        rep: '\:\/\/'
      }
    ]
  };
  clz.Colorize(data);
})();
