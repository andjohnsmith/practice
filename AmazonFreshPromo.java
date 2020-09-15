/**
 * source: https://leetcode.com/discuss/interview-question/762546/
 */
public class AmazonFreshPromo {
  public static void main(String[] args) {
    // test cases
    String[][] codeList1 = {{"apple", "apple"}, {"banana", "anything", "banana"}};
    String[] shoppingCart1 = {"orange", "apple", "apple", "banana", "orange", "banana"};
    String[][] codeList2 = {{"apple", "apple"}, {"banana", "anything", "banana"}};
    String[] shoppingCart2 = {"banana", "orange", "banana", "apple", "apple"};
    String[][] codeList3 = {{"apple", "apple"}, {"banana", "anything", "banana"}};
    String[] shoppingCart3 = {"apple", "banana", "apple", "banana", "orange", "banana"};
    String[][] codeList4 = {{"apple", "apple"}, {"apple", "apple", "banana"}};
    String[] shoppingCart4 = {"apple", "apple", "apple", "banana"};
    String[][] codeList5 = {{"apple", "apple"}, {"banana", "anything", "banana"}};
    String[] shoppingCart5 = {"orange", "apple", "apple", "banana", "orange", "banana"};
    String[][] codeList6 = {{"apple", "apple"}, {"banana", "anything", "banana"}};
    String[] shoppingCart6 = {"apple", "apple", "orange", "orange", "banana", "apple", "banana", "banana"};
    String[][] codeList7= {{"anything", "apple"}, {"banana", "anything", "banana"}};
    String[] shoppingCart7 = {"orange", "grapes", "apple", "orange", "orange", "banana", "apple", "banana", "banana"};
    String[][] codeList8 = {{"apple", "orange"}, {"orange", "banana", "orange"}};
    String[] shoppingCart8 = {"apple", "orange", "banana", "orange", "orange", "banana", "orange", "grape"};
    String[][] codeList9 = {{"anything", "anything", "anything", "apple"}, {"banana", "anything", "banana"}};
    String[] shoppingCart9 = {"orange", "apple", "banana", "orange", "apple", "orange", "orange", "banana", "apple", "banana"};

    // run tests
    test(codeList1, shoppingCart1, true);
    test(codeList2, shoppingCart2, false);
    test(codeList3, shoppingCart3, false);
    test(codeList4, shoppingCart4, false);
    test(codeList5, shoppingCart5, true);
    test(codeList6, shoppingCart6, true);
    test(codeList7, shoppingCart7, true);
    test(codeList8, shoppingCart8, true);
    test(codeList9, shoppingCart9, true);
  }

  public static void test(String[][] codeList, String[] shoppingCart, boolean expectedResult) {
    System.out.println(isWinner(codeList, shoppingCart) == expectedResult ? "Correct" : "Incorrect");
  }

  public static boolean isWinner(String[][] codeList, String[] shoppingCart) {
    if (codeList.length == 0) {
      return true;
    }

    int group = 0;
    int code = 0;

    for (int i = 0; i < shoppingCart.length; i++) {
      String cartItem = shoppingCart[i];
      String codeItem = codeList[group][code];

      if (codeItem.equals("anything") || cartItem.equals(codeItem)) {
        code++;

        if (code == codeList[group].length) {
          code = 0;
          group++;

          if (group == codeList.length) {
            return true;
          }
        }
      } else {
        i -= code;
        code = 0;
      }
    }

    return false;
  }
}