import java.io.BufferedWriter;
import java.io.File;
import java.io.FileFilter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.regex.Pattern;

public class startFastList {

  public static void main(String[] args) {
    String directoryPath;

    final String[] filefilter = new String[1];

    try {
      String appData = System.getenv("APPDATA");
      if (args.length < 1) {
        directoryPath = appData + "\\.minecraft\\versions\\";
        File directory = new File(directoryPath);
        if (directory.exists() && directory.isDirectory()) {
          File[] folders = directory.listFiles(File::isDirectory);
          if (folders != null) {
            directoryPath = directoryPath + folders[0].getName() + "\\mods";
          }
        }
      } else {
        directoryPath = args[0];
        if (args.length > 1) {
          filefilter[0] = args[1];
        }
      }

      FileFilter filter = new FileFilter() {
        @Override
        public boolean accept(File file) {
          if (filefilter[0] == null || filefilter[0].isEmpty()) {
            return true;
          } else {
            String fileName = file.getName();
            String extension = fileName.substring(
                fileName.lastIndexOf('.') + 1);
            boolean match = false;
            Pattern pattern;
            for (String patternString : filefilter) {
              if (patternString != null) {
                String modifiedPatternString = patternString.replace("*", ".*");
                pattern = Pattern.compile(
                    modifiedPatternString,
                    Pattern.CASE_INSENSITIVE);
                if (pattern.matcher(extension).matches()) {
                  match = true;
                  break;
                }
              }
            }
            return match;
          }
        }
      };

      File directory = new File(directoryPath);
      File[] files = directory.listFiles(filter);

      String outputFilePath = directoryPath +
          File.separator +
          Arrays.toString(filefilter) +
          "清單.txt";

      PrintWriter sysOut = new PrintWriter(
          new BufferedWriter(
              new OutputStreamWriter(new FileOutputStream(outputFilePath), StandardCharsets.UTF_8)),
          true);

      sysOut.println("許可證: MIT");
      sysOut.println("=================================");
      for (File file : files) {
        sysOut.println(file.getName());
      }
      sysOut.println("=================================");
      sysOut.println("僅包含副檔名 " + Arrays.toString(filefilter));
      sysOut.close();
      System.out.println("已經將檔案名稱列出並寫入至 " + outputFilePath);
      System.out.println("僅包含副檔名 " + Arrays.toString(filefilter));
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}