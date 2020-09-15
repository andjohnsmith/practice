import java.util.*;

/**
 * source: https://leetcode.com/discuss/interview-question/370112
 */
public class SubstringFinder {
  public static void main(String[] args) {
    System.out.println(findSubtrings("awaglknagawunagwkwagl", 4));
  }

  public static List<String> findSubtrings(String s, int k) {
    Set<String> resultSet = new HashSet<>();
    Set<Character> window = new HashSet<>();
    int length = s.length();

    for (int startIdx = 0, endIdx = 0; endIdx < length; endIdx++) {
      while (window.contains(s.charAt(endIdx))) {
        window.remove(s.charAt(startIdx++));
      }
      
      window.add(s.charAt(endIdx));

      if (window.size() == k) {
        resultSet.add(s.substring(startIdx, endIdx + 1));
        window.remove(s.charAt(startIdx++));
      }
    }

    return new ArrayList<>(resultSet);
  }
}
