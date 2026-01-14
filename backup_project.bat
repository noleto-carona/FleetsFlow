@echo off
setlocal EnableDelayedExpansion

:: ============================================================================
:: CONFIGURACAO DO BACKUP
:: ============================================================================
set "SOURCE_DIR=%~dp0"
:: Remove trailing backslash if present
if "%SOURCE_DIR:~-1%"=="\" set "SOURCE_DIR=%SOURCE_DIR:~0,-1%"

set "DEST_ROOT=F:\backup_fleet_flow"

:: Obtem data e hora para nome da pasta (Formato: YYYY-MM-DD_HH-MM-SS)
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set "TIMESTAMP=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%_%datetime:~8,2%-%datetime:~10,2%-%datetime:~12,2%"

set "BACKUP_DIR=%DEST_ROOT%\FleetsFlow_Backup_%TIMESTAMP%"
set "LOG_FILE=%BACKUP_DIR%\backup_log.txt"

:: ============================================================================
:: INICIO DO PROCESSO
:: ============================================================================
echo ============================================================================
echo INICIANDO BACKUP DO FLEETS FLOW
echo ============================================================================
echo Data/Hora: %DATE% %TIME%
echo Origem: %SOURCE_DIR%
echo Destino: %BACKUP_DIR%
echo.

:: Cria o diretorio de destino
if not exist "%BACKUP_DIR%" (
    mkdir "%BACKUP_DIR%"
    if errorlevel 1 (
        echo [ERRO] Falha ao criar diretorio de destino: %BACKUP_DIR%
        pause
        exit /b 1
    )
)

echo [INFO] Diretorio de backup criado. Iniciando copia... > "%LOG_FILE%"
echo Data: %DATE% %TIME% >> "%LOG_FILE%"
echo ---------------------------------------- >> "%LOG_FILE%"

:: ============================================================================
:: EXECUTANDO ROBOCOPY
:: ============================================================================
:: Opcoes utilizadas:
:: /E   :: Copia subdiretorios, incluindo vazios.
:: /ZB  :: Usa modo reiniciavel; se o acesso for negado, usa modo de backup.
:: /DCOPY:T :: Copia carimbos de data/hora dos diretorios.
:: /COPY:DAT :: Copia dados, atributos e carimbos de data/hora.
:: /R:3 :: Tenta novamente 3 vezes em caso de falha.
:: /W:1 :: Espera 1 segundo entre as tentativas.
:: /XD  :: Exclui diretorios correspondentes aos nomes/caminhos fornecidos.
:: /XF  :: Exclui arquivos correspondentes aos nomes fornecidos.

robocopy "%SOURCE_DIR%" "%BACKUP_DIR%" /E /ZB /DCOPY:T /COPY:DAT /R:3 /W:1 ^
    /XD "node_modules" ".git" "dist" "build" ".next" "coverage" ".vscode" ".idea" "tmp" "temp" ^
    /XF "*.log" "*.tmp" "thumbs.db" "desktop.ini" ^
    /TEE /LOG+:"%LOG_FILE%"

:: Verifica o codigo de saida do Robocopy
:: Codigos 0-7 sao considerados sucesso (0=nada mudou, 1=copia ok, etc)
:: Codigos >= 8 indicam falhas
if %ERRORLEVEL% LSS 8 (
    echo.
    echo ============================================================================
    echo BACKUP CONCLUIDO COM SUCESSO!
    echo ============================================================================
    echo [SUCESSO] Backup finalizado em %DATE% %TIME% >> "%LOG_FILE%"
) else (
    echo.
    echo ============================================================================
    echo BACKUP FINALIZADO COM ERROS! (Codigo: %ERRORLEVEL%)
    echo Verifique o arquivo de log para detalhes.
    echo ============================================================================
    echo [ERRO] Falha no backup. Codigo de saida: %ERRORLEVEL% >> "%LOG_FILE%"
)

echo Log salvo em: %LOG_FILE%
echo Pressione qualquer tecla para sair...
pause
