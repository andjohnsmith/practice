import java.util.*;

/**
 * source: https://leetcode.com/discuss/interview-question/373006
 */
public class FavoriteGenres {
  public static void main(String[] args) {
    Map<String, List<String>> userSongs = new HashMap<>(); 
    userSongs.put("David", Arrays.asList("song1", "song2", "song3", "song4", "song8"));
    userSongs.put("Emma", Arrays.asList("song5", "song6", "song7"));

    Map<String, List<String>> songGenres = new HashMap<>();
    songGenres.put("Rock", Arrays.asList("song1", "song3"));
    songGenres.put("Dubstep", Arrays.asList("song7"));
    songGenres.put("Techno", Arrays.asList("song2", "song4"));
    songGenres.put("Pop", Arrays.asList("song5", "song6"));
    songGenres.put("Jazz", Arrays.asList("song8", "song9"));

    Map<String, List<String>> userGenres = getFavoriteGenres(userSongs, songGenres);
    for (String user : userGenres.keySet()) {
      System.out.println(user + ": " + userGenres.get(user));
    }
  }

  public static Map<String, List<String>> getFavoriteGenres(
    Map<String, List<String>> userSongs, 
    Map<String, List<String>> songGenres
  ) {
    Map<String, String> genres = new HashMap<>();
    for (String genre : songGenres.keySet()) {
      for (String song : songGenres.get(genre)) {
        genres.put(song, genre);
      }
    }

    Map<String, List<String>> userGenres = new HashMap<>();

    for (String user : userSongs.keySet()) {
      int maxCount = 0;
      Map<String, Integer> genreCounts = new HashMap<>();
      List<String> favGenres = new ArrayList<>();

      for (String song : userSongs.get(user)) {
        String genre = genres.get(song);
        int count = genreCounts.getOrDefault(genre, 0) + 1;
        genreCounts.put(genre, count);
        maxCount = Math.max(maxCount, count);
      }

      for (String genre : genreCounts.keySet()) {
        if (genreCounts.get(genre) == maxCount) {
          favGenres.add(genre);
        }
      }

      userGenres.put(user, favGenres);
    }

    return userGenres;
  }
}
