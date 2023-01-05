using System.ComponentModel.DataAnnotations;

namespace Esuper.Data.Model
{
    internal sealed class Transaction
    {
        [Key]
        public int transactionID { get; set; }

        [Required]
        public long accountNumber { get; set; }

        [Required]
        public string date { get; set; }

        [Required]
        public string narration { get; set; }

        [Required]
        public int amount { get; set; }

        [Required]
        public int balance { get; set; }


    }
}
