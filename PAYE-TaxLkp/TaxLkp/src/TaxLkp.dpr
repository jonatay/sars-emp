program TaxLkp;

uses
  Forms,
  formTaxLkpMain in 'formTaxLkpMain.pas' {frmTaxLkpMain},
  classXTaxTable in 'classXTaxTable.pas';

{$R *.res}

begin
  Application.Initialize;
  Application.Title := 'The Tax Looker Upper (EMP 10)';
  Application.CreateForm(TfrmTaxLkpMain, frmTaxLkpMain);
  Application.Run;
end.
