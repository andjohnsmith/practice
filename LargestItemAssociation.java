import java.util.*;

/**
 * source: https://leetcode.com/discuss/interview-question/782606/
 */
public class LargestItemAssociation {
  public static void main(String[] args) {
    List<PairString> pairs1 = Arrays.asList(
			new PairString("item1", "item2"),
			new PairString("item3", "item4"), 
			new PairString("item4", "item5") 
    );
    System.out.println(getLargestItemAssociation(pairs1));

    List<PairString> pairs2 = Arrays.asList(
			new PairString("item1", "item2"),
			new PairString("item3", "item4"), 
			new PairString("item6", "item5") 
    );
    System.out.println(getLargestItemAssociation(pairs2));

    List<PairString> pairs3 = Arrays.asList(
      new PairString("item1","item2"),
      new PairString("item2","item3"),
      new PairString("item4","item5"),
      new PairString("item5","item6")
    );
    System.out.println(getLargestItemAssociation(pairs3));
  }

  public static List<String> getLargestItemAssociation(List<PairString> associatedItems) {
    Map<String, Set<String>> setMap = new HashMap<>();

    for (PairString pair : associatedItems) {
      Set<String> set = setMap.getOrDefault(pair.first, new TreeSet<>());

      set.add(pair.first);
      set.add(pair.second);
      if (setMap.containsKey(pair.second)) {
        set.addAll(setMap.get(pair.second));
      }

      setMap.put(pair.first, set);
      setMap.put(pair.second, set);
    }

    PriorityQueue<List<String>> queue = new PriorityQueue<>(
      (l1, l2) -> l1.size() != l2.size() ? l2.size() - l1.size() : l1.get(0).compareTo(l2.get(0))
    );

    for (String item : setMap.keySet()) {
      queue.add(new ArrayList<>(setMap.get(item)));
    }

    return queue.remove();
  }

  static class PairString {
    String first;
    String second;

    public PairString(String first, String second) {
      this.first = first;
      this.second = second;
    }
  }
}
