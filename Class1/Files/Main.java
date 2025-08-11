public class Main {
    public static void main(String[] args) {
        int[][] queries = {
                { 2, 2 }
        };
        System.out.println(Solution.productQueries(2, queries));
    }

    static class Solution {
        private static final int[] powers;
        static {
            powers = new int[32];
            init();
        }
        private static int MOD = 1_000_000_007;

        public static int[] productQueries(int n, int[][] queries) {
            int[] answers = new int[queries.length];
            for (int i = 0; i < queries.length; i++) {
                int left = queries[i][0];
                int right = queries[i][1];
                answers[i] = calculate(left, right);
            }
            return answers;
        }

        private static void init() {
            for (int i = 0; i < 32; i++) {
                powers[i] = (1 << i);
            }
        }

        private static int calculate(int left, int right) {
            int product = 1;
            for (int i = left; i <= right; i++) {
                product = (product * powers[i]) % MOD;
            }
            return product;
        }
    }
}