unit formTaxLkpMain;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, ExtCtrls, RzPanel, RsControls, Buttons, RzButton, StdCtrls,
  RzLabel, Mask, RzEdit, RsDialogs, clipbrd;

type
  TfrmTaxLkpMain = class(TForm)
    pnlMain: TRsPanel;
    lblIncType: TRsLabel;
    edtIncome: TRsEdit;
    RsLabel3: TRsLabel;
    edtTax: TRsEdit;
    RsBitBtn1: TRsBitBtn;
    dlgOpen: TRsOpenDialog;
    chbOver65: TCheckBox;
    chbAnnual: TCheckBox;
    RsBitBtn2: TRsBitBtn;
    procedure FormCreate(Sender: TObject);
    procedure edtIncomeKeyPress(Sender: TObject; var Key: Char);
    procedure edtIncomeChange(Sender: TObject);
    procedure FormShow(Sender: TObject);
    procedure chbOver65Click(Sender: TObject);
    procedure chbAnnualClick(Sender: TObject);
    procedure RsBitBtn2Click(Sender: TObject);
  private
    { Private declarations }
    fFileName : string;

    procedure ImportFile;
    procedure OnApplicationActivate(Sender: TObject);

    procedure LookupTax;
  public
    { Public declarations }
  end;

var
  frmTaxLkpMain: TfrmTaxLkpMain;

implementation

{$R *.dfm}

uses classXTaxTable, Math;

procedure TfrmTaxLkpMain.FormCreate(Sender: TObject);
begin
  fFileName := ExtractFilePath(Application.ExeName) + 'PAYE.xml';
  if not FileExists(fFileName) then
    ImportFile
  else
    TheTaxTable.LoadFromFile(fFileName);
end;

procedure TfrmTaxLkpMain.ImportFile;
begin
  dlgOpen.InitialDir := ExtractFilePath(Application.ExeName);
  dlgOpen.Filter := 'Text|*.txt';
  if dlgOpen.Execute then
    TheTaxTable.ImportTextTable(dlgOpen.FileName);
  TheTaxTable.SaveToFile(fFileName);
  Caption := Format('The Tax Looker Upper (%d)', [TheTaxTable.TaxYear]);
  LookupTax;
end;

procedure TfrmTaxLkpMain.edtIncomeKeyPress(Sender: TObject; var Key: Char);
begin
  if not (key in ['0','1','2','3','4','5','6','7','8','9','','.']) then
    abort;
end;

procedure TfrmTaxLkpMain.edtIncomeChange(Sender: TObject);
begin
  LookupTax;
end;

procedure TfrmTaxLkpMain.FormShow(Sender: TObject);
begin
  Caption := Format('The Tax Looker Upper (%d)', [TheTaxTable.TaxYear]);
  Application.OnActivate := OnApplicationActivate;
    edtIncome.SelectAll;
end;

procedure TfrmTaxLkpMain.OnApplicationActivate(Sender: TObject);
begin
  edtIncome.SetFocus;
  edtIncome.SelectAll;
end;

procedure TfrmTaxLkpMain.RsBitBtn2Click(Sender: TObject);
begin
  ImportFile;
end;

procedure TfrmTaxLkpMain.LookupTax;
var
  cTax : Currency;
begin
  cTax := 0;
  if edtIncome.Text > '' then
  begin
    cTax := TheTaxTable.LookupTax(StrToCurr(edtIncome.Text));
    edtTax.Text := format('%m', [cTax]);
  end
  else
    edtTax.Text := format('%m', [cTax]);
  Clipboard.AsText := FloatToStr(cTax);
end;

procedure TfrmTaxLkpMain.chbOver65Click(Sender: TObject);
begin
  TheTaxTable.IsOver65 := chbOver65.Checked;
  LookupTax;
end;


procedure TfrmTaxLkpMain.chbAnnualClick(Sender: TObject);
begin
  TheTaxTable.IsAnnual := chbAnnual.Checked;
  if TheTaxTable.IsAnnual then
    lblIncType.Caption := 'Annual Income:'
  else
    lblIncType.Caption := 'Monthly Income:';
  LookupTax;
end;

end.
