@ECHO OFF

SET SERVICENAME=NODE_ROBO_CONFIRMAFACIL
SET NSSM="%CD%\nssm\nssm.exe"

ECHO INSTALLING SERVICE %SERVICENAME%

%NSSM% stop %SERVICENAME%
%NSSM% remove %SERVICENAME% confirm
