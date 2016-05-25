using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Wedding.Models
{
    public class IndexViewModel
    {
        public List<MessageModel> Messages { get; set; }

        public IndexViewModel()
        {
            Messages = new List<MessageModel>();
        }
    }
}