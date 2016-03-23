﻿using System.Data.Entity;

namespace DiplomaDataModel.CourseOption
{
    public class CourseOptionContext : DbContext
    {
        public CourseOptionContext() : base("DefaultConnection") {
            base.Configuration.ProxyCreationEnabled = false;
        }
        public DbSet<Option> Options { get; set; }
        public DbSet<YearTerm> YearTerms { get; set; }
        public DbSet<Choice> Choices { get; set; }
    }
}
