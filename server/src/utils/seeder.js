const Problem = require("../models/Problem");

const seedProblems = [
    // === EASY ===
    {
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
        inputFormat: "nums: Array of integers, target: Integer",
        outputFormat: "Array of two indices [index1, index2]",
        examples: [
            {
                input: "nums = [2,7,11,15], target = 9",
                output: "[0,1]",
                explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            }
        ],
        constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n        return {};\n    }\n};`,
            java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[0];\n    }\n}`,
            python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Your code here\n        return []`,
            javascript: `function twoSum(nums, target) {\n    // Your code here\n    return [];\n}`,
            c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Your code here\n    *returnSize = 0;\n    return NULL;\n}`
        }
    },
    {
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        inputFormat: "s: String of bracket characters",
        outputFormat: "Boolean representing validity",
        examples: [
            {
                input: "s = \"()[]{}\"",
                output: "true"
            }
        ],
        constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only."],
        languageTemplates: {
            cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Your code here\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n}`,
            python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        # Your code here\n        return False`,
            javascript: `function isValid(s) {\n    // Your code here\n    return false;\n}`,
            c: `bool isValid(char* s) {\n    // Your code here\n    return false;\n}`
        }
    },
    {
        title: "Roman to Integer",
        difficulty: "Easy",
        description: "Convert a given Roman numeral string s into its corresponding integer value.",
        inputFormat: "s: String representing a roman numeral",
        outputFormat: "Integer value",
        examples: [{ input: "s = \"III\"", output: "3" }],
        constraints: ["1 <= s.length <= 15", "s contains Roman symbols only."],
        languageTemplates: {
            cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int romanToInt(string s) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int romanToInt(String s) {\n        return 0;\n    }\n}`,
            python: `class Solution:\n    def romanToInt(self, s: str) -> int:\n        return 0`,
            javascript: `function romanToInt(s) {\n    return 0;\n}`,
            c: `int romanToInt(char* s) {\n    return 0;\n}`
        }
    },
    {
        title: "Merge Sorted Array",
        difficulty: "Easy",
        description: "Merge two sorted integer arrays nums1 and nums2 into a single sorted array in-place.",
        inputFormat: "nums1: Array, m: Integer, nums2: Array, n: Integer",
        outputFormat: "Void (Merge in-place)",
        examples: [{ input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", output: "[1,2,2,3,5,6]" }],
        constraints: ["nums1.length == m + n", "0 <= m, n <= 200"],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        \n    }\n};`,
            java: `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        \n    }\n}`,
            python: `class Solution:\n    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> None:\n        return`,
            javascript: `function merge(nums1, m, nums2, n) {\n    \n}`,
            c: `void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {\n    \n}`
        }
    },
    {
        title: "Remove Duplicates",
        difficulty: "Easy",
        description: "Remove duplicates from a sorted integer array in-place, returning the count of unique elements.",
        inputFormat: "nums: Array of sorted integers",
        outputFormat: "Integer k (number of unique elements)",
        examples: [{ input: "nums = [1,1,2]", output: "2, nums = [1,2,_]" }],
        constraints: ["1 <= nums.length <= 3 * 10^4", "nums is sorted."],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int removeDuplicates(int[] nums) {\n        return 0;\n    }\n}`,
            python: `class Solution:\n    def removeDuplicates(self, nums: list[int]) -> int:\n        return 0`,
            javascript: `function removeDuplicates(nums) {\n    return 0;\n}`,
            c: `int removeDuplicates(int* nums, int numsSize) {\n    return 0;\n}`
        }
    },
    {
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        description: "Find the maximum profit you can achieve by buying on one day and selling on a future day.",
        inputFormat: "prices: Array of daily prices",
        outputFormat: "Integer profit",
        examples: [{ input: "prices = [7,1,5,3,6,4]", output: "5" }],
        constraints: ["1 <= prices.length <= 10^5"],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int maxProfit(int[] prices) {\n        return 0;\n    }\n}`,
            python: `class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        return 0`,
            javascript: `function maxProfit(prices) {\n    return 0;\n}`,
            c: `int maxProfit(int* prices, int pricesSize) {\n    return 0;\n}`
        }
    },
    {
        title: "Palindrome Number",
        difficulty: "Easy",
        description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
        inputFormat: "x: Integer",
        outputFormat: "Boolean representing palindrome check",
        examples: [{ input: "x = 121", output: "true" }],
        constraints: ["-2^31 <= x <= 2^31 - 1"],
        languageTemplates: {
            cpp: `class Solution {\npublic:\n    bool isPalindrome(int x) {\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean isPalindrome(int x) {\n        return false;\n    }\n}`,
            python: `class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        return False`,
            javascript: `function isPalindrome(x) {\n    return false;\n}`,
            c: `bool isPalindrome(int x) {\n    return false;\n}`
        }
    },
    {
        title: "Climbing Stairs",
        difficulty: "Easy",
        description: "It takes n steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        inputFormat: "n: Integer steps",
        outputFormat: "Integer representing ways",
        examples: [{ input: "n = 3", output: "3" }],
        constraints: ["1 <= n <= 45"],
        languageTemplates: {
            cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}`,
            python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        return 0`,
            javascript: `function climbStairs(n) {\n    return 0;\n}`,
            c: `int climbStairs(int n) {\n    return 0;\n}`
        }
    },

    // === MEDIUM ===
    {
        title: "Add Two Numbers",
        difficulty: "Medium",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order. Add the two numbers and return it as a linked list.",
        inputFormat: "l1: ListNode, l2: ListNode",
        outputFormat: "ListNode representing sum",
        examples: [{ input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]" }],
        constraints: ["Length of lists in [1, 100]", "0 <= Node.val <= 9"],
        languageTemplates: {
            cpp: `class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        return nullptr;\n    }\n};`,
            java: `class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        return null;\n    }\n}`,
            python: `class Solution:\n    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:\n        return None`,
            javascript: `function addTwoNumbers(l1, l2) {\n    return null;\n}`,
            c: `struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {\n    return NULL;\n}`
        }
    },
    {
        title: "Group Anagrams",
        difficulty: "Medium",
        description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
        inputFormat: "strs: Array of strings",
        outputFormat: "Array of grouped strings list",
        examples: [{ input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" }],
        constraints: ["1 <= strs.length <= 10^4", "strs[i] consists of lowercase English letters."],
        languageTemplates: {
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        return {};\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        return new ArrayList<>();\n    }\n}`,
            python: `class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        return []`,
            javascript: `function groupAnagrams(strs) {\n    return [];\n}`,
            c: `char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {\n    return NULL;\n}`
        }
    },
    {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        inputFormat: "s: String",
        outputFormat: "Integer length",
        examples: [{ input: "s = \"abcabcbb\"", output: "3" }],
        constraints: ["0 <= s.length <= 5 * 10^4"],
        languageTemplates: {
            cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        return 0;\n    }\n}`,
            python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        return 0`,
            javascript: `function lengthOfLongestSubstring(s) {\n    return 0;\n}`,
            c: `int lengthOfLongestSubstring(char* s) {\n    return 0;\n}`
        }
    },
    {
        title: "Product of Array Except Self",
        difficulty: "Medium",
        description: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements of nums except nums[i].",
        inputFormat: "nums: Array of integers",
        outputFormat: "Array of products",
        examples: [{ input: "nums = [1,2,3,4]", output: "[24,12,8,6]" }],
        constraints: ["2 <= nums.length <= 10^5"],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        return {};\n    }\n};`,
            java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        return new int[0];\n    }\n}`,
            python: `class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        return []`,
            javascript: `function productExceptSelf(nums) {\n    return [];\n}`,
            c: `int* productExceptSelf(int* nums, int numsSize, int* returnSize) {\n    return NULL;\n}`
        }
    },
    {
        title: "Daily Temperatures",
        difficulty: "Medium",
        description: "Given an array of integers temperatures representing the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the i-th day to get a warmer temperature.",
        inputFormat: "temperatures: Array of integers",
        outputFormat: "Array of integers representing days wait",
        examples: [{ input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" }],
        constraints: ["1 <= temperatures.length <= 10^5"],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        return {};\n    }\n};`,
            java: `class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        return new int[0];\n    }\n}`,
            python: `class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        return []`,
            javascript: `function dailyTemperatures(temperatures) {\n    return [];\n}`,
            c: `int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {\n    return NULL;\n}`
        }
    },
    {
        title: "Top K Frequent Elements",
        difficulty: "Medium",
        description: "Given an integer array nums and an integer k, return the k most frequent elements.",
        inputFormat: "nums: Array of integers, k: Integer",
        outputFormat: "Array of k elements",
        examples: [{ input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" }],
        constraints: ["1 <= nums.length <= 10^5", "k is in range of unique elements."],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        return {};\n    }\n};`,
            java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        return new int[0];\n    }\n}`,
            python: `class Solution:\n    def topKFrequent(self, nums: list[int], k: int) -> list[int]:\n        return []`,
            javascript: `function topKFrequent(nums, k) {\n    return [];\n}`,
            c: `int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {\n    return NULL;\n}`
        }
    },
    {
        title: "Coin Change",
        difficulty: "Medium",
        description: "Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
        inputFormat: "coins: Array, amount: Integer",
        outputFormat: "Integer number of coins",
        examples: [{ input: "coins = [1,2,5], amount = 11", output: "3" }],
        constraints: ["1 <= coins.length <= 12", "0 <= amount <= 10^4"],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        return 0;\n    }\n}`,
            python: `class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        return 0`,
            javascript: `function coinChange(coins, amount) {\n    return 0;\n}`,
            c: `int coinChange(int* coins, int coinsSize, int amount) {\n    return 0;\n}`
        }
    },
    {
        title: "Number of Islands",
        difficulty: "Medium",
        description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
        inputFormat: "grid: 2D array of chars",
        outputFormat: "Integer islands count",
        examples: [{ input: "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", output: "1" }],
        constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300"],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int numIslands(char[][] grid) {\n        return 0;\n    }\n}`,
            python: `class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        return 0`,
            javascript: `function numIslands(grid) {\n    return 0;\n}`,
            c: `int numIslands(char** grid, int gridSize, int* gridColSize) {\n    return 0;\n}`
        }
    },

    // === HARD ===
    {
        title: "Merge K Sorted Lists",
        difficulty: "Hard",
        description: "Merge k sorted linked lists and return it as one sorted list.",
        inputFormat: "lists: Array of listNodes",
        outputFormat: "ListNode merged list",
        examples: [{ input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" }],
        constraints: ["k == lists.length", "0 <= k <= 10^4"],
        languageTemplates: {
            cpp: `class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        return nullptr;\n    }\n};`,
            java: `class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        return null;\n    }\n}`,
            python: `class Solution:\n    def mergeKLists(self, lists: list[ListNode]) -> ListNode:\n        return None`,
            javascript: `function mergeKLists(lists) {\n    return null;\n}`,
            c: `struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {\n    return NULL;\n}`
        }
    },
    {
        title: "Trapping Rain Water",
        difficulty: "Hard",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        inputFormat: "height: Array of integers",
        outputFormat: "Integer volume trapped",
        examples: [{ input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }],
        constraints: ["n == height.length", "1 <= n <= 2 * 10^4"],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        return 0;\n    }\n};`,
            java: `class Solution {\n    public int trap(int[] height) {\n        return 0;\n    }\n}`,
            python: `class Solution:\n    def trap(self, height: list[int]) -> int:\n        return 0`,
            javascript: `function trap(height) {\n    return 0;\n}`,
            c: `int trap(int* height, int heightSize) {\n    return 0;\n}`
        }
    },
    {
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        inputFormat: "nums1: Array, nums2: Array",
        outputFormat: "Double representing median value",
        examples: [{ input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" }],
        constraints: ["m == nums1.length", "n == nums2.length", "0 <= m, n <= 1000"],
        languageTemplates: {
            cpp: `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        return 0.0;\n    }\n};`,
            java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        return 0.0;\n    }\n}`,
            python: `class Solution:\n    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:\n        return 0.0`,
            javascript: `function findMedianSortedArrays(nums1, nums2) {\n    return 0.0;\n}`,
            c: `double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {\n    return 0.0;\n}`
        }
    },
    {
        title: "Word Ladder",
        difficulty: "Hard",
        description: "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord.",
        inputFormat: "beginWord: String, endWord: String, wordList: Array of strings",
        outputFormat: "Integer length of ladder",
        examples: [{ input: "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", output: "5" }],
        constraints: ["1 <= beginWord.length <= 10", "1 <= wordList.length <= 5000"],
        languageTemplates: {
            cpp: `#include <string>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        return 0;\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        return 0;\n    }\n}`,
            python: `class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        return 0`,
            javascript: `function ladderLength(beginWord, endWord, wordList) {\n    return 0;\n}`,
            c: `int ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {\n    return 0;\n}`
        }
    },
    {
        title: "Serialize and Deserialize Binary Tree",
        difficulty: "Hard",
        description: "Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.",
        inputFormat: "root: TreeNode",
        outputFormat: "TreeNode rebuilt from serialized form",
        examples: [{ input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]" }],
        constraints: ["The number of nodes in the tree is in range [0, 10^4]."],
        languageTemplates: {
            cpp: `class Codec {\npublic:\n    string serialize(TreeNode* root) {\n        return "";\n    }\n    TreeNode* deserialize(string data) {\n        return nullptr;\n    }\n};`,
            java: `public class Codec {\n    public String serialize(TreeNode root) {\n        return "";\n    }\n    public TreeNode deserialize(String data) {\n        return null;\n    }\n}`,
            python: `class Codec:\n    def serialize(self, root: TreeNode) -> str:\n        return ""\n    def deserialize(self, data: str) -> TreeNode:\n        return None`,
            javascript: `function serialize(root) {\n    return "";\n}\nfunction deserialize(data) {\n    return null;\n}`,
            c: `char* serialize(struct TreeNode* root) {\n    return "";\n}\nstruct TreeNode* deserialize(char* data) {\n    return NULL;\n}`
        }
    },
    {
        title: "N Queens",
        difficulty: "Hard",
        description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.",
        inputFormat: "n: Integer board size",
        outputFormat: "2D Array of board layouts",
        examples: [{ input: "n = 4", output: "[[ \".Q..\", \"...Q\", \"Q...\", \"..Q.\" ], [ \"..Q.\", \"Q...\", \"...Q\", \".Q..\" ]]" }],
        constraints: ["1 <= n <= 9"],
        languageTemplates: {
            cpp: `#include <vector>\n#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        return {};\n    }\n};`,
            java: `import java.util.*;\nclass Solution {\n    public List<List<String>> solveNQueens(int n) {\n        return new ArrayList<>();\n    }\n}`,
            python: `class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        return []`,
            javascript: `function solveNQueens(n) {\n    return [];\n}`,
            c: `char*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {\n    return NULL;\n}`
        }
    },
    {
        title: "Minimum Window Substring",
        difficulty: "Hard",
        description: "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
        inputFormat: "s: String, t: String",
        outputFormat: "String minimum window",
        examples: [{ input: "s = \"ADOBECODEBANC\", t = \"ABC\"", output: "\"BANC\"" }],
        constraints: ["1 <= s.length, t.length <= 10^5"],
        languageTemplates: {
            cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        return "";\n    }\n};`,
            java: `class Solution {\n    public String minWindow(String s, String t) {\n        return "";\n    }\n}`,
            python: `class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        return ""`,
            javascript: `function minWindow(s, t) {\n    return "";\n}`,
            c: `char* minWindow(char* s, char* t) {\n    return "";\n}`
        }
    },
    {
        title: "Regular Expression Matching",
        difficulty: "Hard",
        description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
        inputFormat: "s: String, p: String",
        outputFormat: "Boolean representing match state",
        examples: [{ input: "s = \"aa\", p = \"a*\"", output: "true" }],
        constraints: ["1 <= s.length, p.length <= 20"],
        languageTemplates: {
            cpp: `#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isMatch(string s, string p) {\n        return false;\n    }\n};`,
            java: `class Solution {\n    public boolean isMatch(String s, String p) {\n        return false;\n    }\n}`,
            python: `class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        return False`,
            javascript: `function isMatch(s, p) {\n    return false;\n}`,
            c: `bool isMatch(char* s, char* p) {\n    return false;\n}`
        }
    }
];

const seedDB = async () => {
    try {
        const count = await Problem.countDocuments();
        if (count === 0) {
            console.log("🌱 Database Problem Bank empty. Seeding 24 algorithmic challenges...");
            await Problem.insertMany(seedProblems);
            console.log("✅ Seeded Easy, Medium, and Hard problem lists successfully!");
        } else {
            console.log(`ℹ️ Database contains ${count} challenges. Seeding skipped.`);
        }
    } catch (err) {
        console.error("❌ Problem seeding failed:", err);
    }
};

module.exports = seedDB;
