param
(
  [Parameter(Mandatory=$true)]
  [string]
  $MediaPath
)

$resolutions = @(
  @{
    Size = 720;
    Rate = 1500;
    Buffer = 1000;
    Scale = -1;
  },

  @{
    Size = 360;
    Rate = 400;
    Buffer = 400;
    Scale = -1;
  },

  @{
    Size = 144;
    Rate = 300;
    Buffer = 300;
    Scale = 256;
  }
);

$baseOutputPath = Join-Path $MediaPath -ChildPath 'output'

foreach ($mediaFile in (Get-ChildItem $MediaPath -Filter '*.mp4')) {
  $mediaName = $mediaFile -replace '(\.mp4)|(\-\d+x\d+)'
  $inputFile = Join-Path $MediaPath -ChildPath $mediaFile
  $outputDir = Join-Path $baseOutputPath -ChildPath $mediaName

  New-Item $outputDir -ItemType Directory -Force | Out-Null

  Write-Host "Rendering `"$mediaName`"" -ForegroundColor Cyan

  $duration = ((& ffprobe -i $inputFile -show_format -v quiet | Out-String) |
    Select-String -Pattern 'duration=([\.\d]*)').Matches.Groups[1].Value

  foreach ($resolution in $resolutions) {
    $outputFile = Join-Path $outputDir -ChildPath "$mediaName-$duration-$($resolution.Size).mp4"

    Write-Host "Rendering in $($resolution.Size)p .." -ForegroundColor DarkGray

    & ffmpeg -y -i "`"$inputFile`"" `
     -c:a aac -ac 2 `
     -vcodec h264 -acodec aac `
     -ab 128k `
     -movflags frag_keyframe+empty_moov+default_base_moof `
     -b:v "$($resolution.Rate)k" `
     -maxrate "$($resolution.Rate)k" `
     -bufsize "$($resolution.Buffer)k" `
     -vf `"scale="$($resolution.Scale)":"$($resolution.Size)"`" `
     -v quiet
     "`"$outputFile`""
  }
}

Write-Host "Files written to `"$baseOutputPath`"" -ForegroundColor Blue
Write-Host 'Done.' -ForegroundColor Green
