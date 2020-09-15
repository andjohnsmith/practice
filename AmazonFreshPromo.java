public class AmazonFreshPromo {
  public static void main(String[] args) {
    String[][] codeList = {{"apple", "apple"}, {"banana", "anything", "banana"}};
    String[] shoppingCart = {"orange", "apple", "apple", "banana", "orange", "banana"};

    System.out.println("is winner? " + isWinner(codeList, shoppingCart));
  }

  public static boolean isWinner(String[][] codeList, String[] shoppingCart) {
    if (codeList.length == 0) {
      return true;
    }

    int group = 0;
    int code = 0;

    for (String item : shoppingCart) {
      if (codeList[group][code].equals("anything") || item.equals(codeList[group][code])) {
        code++;

        if (code == codeList[group].length) {
          code = 0;
          group++;

          if (group == codeList.length) {
            return true;
          }
        }
      } else {
        code = 0;
      }
    }

    return false;
  }
}