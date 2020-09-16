import java.util.*;

/**
 * source: https://leetcode.com/discuss/interview-question/808374/
 */
public class NearestCity {
  public static void main(String[] args) {
    int numOfCities = 4;
    String[] cities = {"c1", "c2", "c3", "c0"};
    int[] xCoordinates = {3, 2, 1, 1};
    int[] yCoordinates = {3, 2, 3, 3};
    int numOfQueries = 3;
    String[] queries = {"c1", "c2", "c3"};

    String[] res = getNearestCities(numOfCities, cities, xCoordinates, yCoordinates, numOfQueries, queries);
    System.out.print("[");
    for (String city : res) {
      System.out.print(city + ", ");
    }
    System.out.println("]");
  }

  public static String[] getNearestCities(
    int numOfCities, String[] cities, int[] xCoordinates, int[] yCoordinates, 
    int numOfQueries, String[] queries
  ) {
    Map<String, int[]> nameMap = new HashMap<>(); // 0 index is x, 1 index is y
    Map<Integer, List<String>> xMap = new HashMap<>();
    Map<Integer, List<String>> yMap = new HashMap<>();

    // initialize cities and maps
    for (int i = 0; i < numOfCities; i++) {
      String name = cities[i];
      int x = xCoordinates[i];
      int y = yCoordinates[i];

      nameMap.put(name, new int[]{x, y});

      if (xMap.containsKey(x)) {
        xMap.get(x).add(name);
      } else {
        xMap.put(x, new ArrayList<String>(Arrays.asList(name)));
      }

      if (yMap.containsKey(y)) {
        yMap.get(y).add(name);
      } else {
        yMap.put(y, new ArrayList<String>(Arrays.asList(name)));
      }
    }

    String[] nearestCities = new String[numOfQueries];

    // find nearest cities
    for (int i = 0; i < numOfQueries; i++) {
      String name = queries[i];
      int[] coordinates = nameMap.get(name);
      int x = coordinates[0];
      int y = coordinates[1];

      String nearest = "";
      int minDist = Integer.MAX_VALUE;

      // check x and y matches
      for (String match : xMap.get(x)) {
        if (match.equals(name)) {
          continue;
        }

        // get y val
        int matchY = nameMap.get(match)[1];
        int dist = Math.abs(y - matchY);

        if (dist < minDist) {
          minDist = dist;
          nearest = match;
        } else if (dist == minDist && match.compareTo(nearest) < 0) {
          nearest = match;
        }
      }

      for (String match : yMap.get(y)) {
        if (match.equals(name)) {
          continue;
        }

        // get x val
        int matchX = nameMap.get(match)[0];
        int dist = Math.abs(x - matchX);

        if (dist < minDist) {
          minDist = dist;
          nearest = match;
        } else if (dist == minDist && match.compareTo(nearest) < 0) {
          nearest = match;
        }
      }

      if (nearest.equals("")) {
        nearestCities[i] = "None";
      } else {
        nearestCities[i] = nearest;
      }
    }

    return nearestCities;
  }
}
