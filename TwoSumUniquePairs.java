import java.util.*;

/**
 * source: https://leetcode.com/discuss/interview-question/372434
 */
public class TwoSumUniquePairs {
  public static void main(String[] args) {
    int[] nums1 = {1, 1, 2, 45, 46, 46};
    System.out.println(twoSum(nums1, 47));

    int[] nums2 = {1, 1};
    System.out.println(twoSum(nums2, 2));

    int[] nums3 = {1, 5, 1, 5};
    System.out.println(twoSum(nums3, 6));
  }

  public static int twoSum(int[] nums, int target) {
    int count = 0;
    Set<Integer> seenNums = new HashSet<>();
    boolean usedSqrt = false;

    for (int num : nums) {
      if (seenNums.contains(num)) {
        if (target - num == num && !usedSqrt) {
          count++;
          usedSqrt = true;
        }
      } else {
        if (seenNums.contains((target - num))) {
          count++;
        }

        seenNums.add(num);
      }
    }

    return count;
  }
}
